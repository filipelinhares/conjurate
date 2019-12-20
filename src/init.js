const path = require('path')
const fs = require('fs').promises
const signale = require('signale')

const CONJURATE_CONFIG_JSON = (folder = './conjurate') => (`{
  "templatesSource": "${folder}",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
`)

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
  setup
}
