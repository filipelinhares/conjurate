const path = require('path')
const fs = require('fs-extra')
const readline = require('readline')
const signale = require('signale')
const dim = require('ansi-dim')
const italic = require('ansi-italic')

const CONJURATE_CONFIG_JSON = (folder = './conjurate') => (`{
  "templatesSource": "${folder}",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
`)

const prompt = ({ question, initial }) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve, reject) => {
    rl.question(`${question} ${dim(italic(`default: ${initial}`))} `, (answer) => {
      rl.close()
      resolve({ confirm: true, answer })
    })
  })
}

const setup = async ({ cwd, response, flags }) => {
  if (response.confirm) {
    await fs.writeFile(
      path.resolve(cwd, '.conjurate.json'),
      CONJURATE_CONFIG_JSON(response.answer)
    )
    if (flags.logs) signale.success('Created .conjurate.json')
  }
}

module.exports = {
  setup,
  prompt
}
