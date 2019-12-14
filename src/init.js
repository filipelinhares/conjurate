const path = require('path')
const fs = require('fs-extra')
const signale = require('signale')

const CONJURATE_CONFIG_JSON = `{
  "templatesSource": "./conjurate",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
`

const QUESTIONS = [
  {
    type: 'text',
    name: 'templates',
    initial: './conjurate',
    message: 'A folder to keep your templates files'
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Can you confirm?',
    initial: true
  }
]

const setup = async ({ cwd, response, flags }) => {
  if (response.confirm) {
    await fs.writeFile(
      path.resolve(cwd, '.conjurate.json'),
      CONJURATE_CONFIG_JSON
    )
    if (flags.logs) signale.success('Created .conjurate.json')
  }
}

module.exports = {
  setup,
  QUESTIONS
}
