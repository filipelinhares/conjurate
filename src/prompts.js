const readline = require('readline')
const dim = require('ansi-dim')
const italic = require('ansi-italic')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = ({ question, initial }) => {
  return new Promise((resolve, reject) => {
    rl.question(`${question} ${dim(italic(`(default: ${initial})`))} `, (answer) => {
      rl.close()
      resolve({ confirm: true, answer: answer || initial })
    })
  })
}

const confirmation = ({ question, initial }) => {
  return new Promise((resolve, reject) => {
    rl.question(`${question} ${dim(italic(initial ? 'n/Y' : 'N/y'))} `, (answer) => {
      rl.close()
      if (answer.length) {
        resolve({ confirm: !!answer.match(/y/g) })
      }
      resolve({ confirm: initial })
    })
  })
}

module.exports = {
  prompt, confirmation
}
