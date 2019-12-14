const { Transform } = require('stream')

const findAll = search => new RegExp(search, 'g')

const isEmpty = obj => {
  if (Array.isArray(obj)) {
    return obj.length === 0
  }

  return !obj || (obj && Object.keys(obj).length === 0)
}

const mapStream = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform (chunk, _encoding, callback) {
      let res
      try {
        res = fn(chunk)
      } catch (error) {
        return callback(error)
      }

      callback(null, res)
    }
  })

const condPipe = (conditional, fn) => {
  if (conditional) {
    return mapStream(fn)
  }

  return mapStream(item => item)
}

module.exports = {
  findAll,
  isEmpty,
  mapStream,
  condPipe
}
