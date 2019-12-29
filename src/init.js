const path = require('path')
const fs = require('fs').promises
const signale = require('signale')

const CONJURATE_CONFIG_JSON = (folder = './conjurate') => (`{
  "templatesSource": "${folder}",
  "templates": {
    "<template-name>": "./<default-output>"
  }
}
`)

const setup = async ({ cwd, response, flags }) => {
  if (response.confirm) {
    const templatesSource = path.resolve(cwd, response.answer)

    await fs.writeFile(
      path.resolve(cwd, '.conjurate.json'),
      CONJURATE_CONFIG_JSON(response.answer)
    )

    try {
      await fs.open(templatesSource)
    } catch (err) {
      await fs.mkdir(templatesSource)
      if (flags.logs) signale.success(`Created ${path.relative(cwd, templatesSource)}`)
    }

    if (flags.logs) signale.success('Created .conjurate.json')
  }
}

module.exports = {
  setup
}
