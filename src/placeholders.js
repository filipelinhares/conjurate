const caseFn = require('change-case')

const getFirst = str => {
  const word = caseFn.kebab(str).split('-')
  const [first] = word
  return first
}

const getLast = str => {
  const word = caseFn.kebab(str).split('-')
  const last = word.slice(-1).pop()
  return last
}

const placeholderMap = {
  '%camel-case%': caseFn.camelCase,
  '%lower-case%': caseFn.lowerCase,
  '%no-case%': caseFn.noCase,
  '%dot-case%': caseFn.dotCase,
  '%dash-case%': caseFn.kebabCase,
  '%pascal-case%': caseFn.pascalCase,
  '%path-case%': caseFn.pathCase,
  '%snake-case%': caseFn.snakeCase,
  '%swap-case%': caseFn.swapCase,
  '%title-case%': caseFn.titleCase,
  '%upper-case%': caseFn.upperCase,
  '%first-word%': getFirst,
  '%last-word%': getLast
}

const REGEX_CASES = new RegExp(Object.keys(placeholderMap).join('|'), 'g')

const renderPlaceholders = ({ match, replace }) => {
  return placeholderMap[match](replace)
}

module.exports = {
  renderPlaceholders,
  REGEX_CASES
}
