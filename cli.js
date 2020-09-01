#!/usr/bin/env node
const path = require('path')
const fs = require('fs').promises
const mri = require('mri')
const signale = require('signale')
const generator = require('./src/generator')
const { HELP, printCommands, VERSION } = require('./src/content.js')
const parseConfig = require('./src/parse-config.js')
const { prompt, confirmation } = require('./src/prompts')
const { setup } = require('./src/init.js')
const userDir = process.cwd()
const argv = process.argv.slice(2)

const CLI = mri(argv, {
  alias: {
    v: 'version',
    i: 'init',
    t: 'templates',
    o: 'output',
    fl: 'flat',
    l: 'logs'
  },
  default: {
    logs: true
  }
})

async function main (cli) {
  if (cli.version) {
    signale.log(`
      conjurate@${VERSION}`)
    process.exit()
  }

  if (cli.init) {
    const response = await prompt({
      question: 'Choose a folder to keep your templates',
      initial: './conjurate'
    })
    await setup({ cwd: userDir, response, flags: CLI })
    process.exit()
  }

  const {
    error: configFileError,
    templates,
    templatesSource
  } = await parseConfig({ cwd: userDir })

  if (configFileError) {
    signale.error(configFileError)
    process.exit()
  }

  if (cli.templates) {
    signale.log(printCommands(templates))
    process.exit()
  }

  if (cli._.length >= 2) {
    const [folder, param] = cli._

    if (!Object.keys(templates).includes(folder)) {
      signale.error(`Template not found, try one of:
          ${printCommands(templates)}`
      )
      process.exit()
    }

    const dest = cli.output
      ? path.resolve(userDir, cli.output, param)
      : cli.flat
        ? path.resolve(userDir, templates[folder])
        : path.resolve(userDir, templates[folder], param)

    const templatesFolder = path.resolve(userDir, templatesSource, folder)

    try {
      await fs.open(templatesFolder)
    } catch (error) {
      if (error.code === 'ENOENT') {
        signale.error(`${templatesSource}/${folder} template does not exist`)
        signale.log(`
          The template "${folder}" is configured but you have no corresponding folder inside your ${templatesSource}`)
        process.exit()
      }
    }

    try {
      const exist = await fs.open(dest)
      if (!cli.flat && exist) {
        const { confirm } = await confirmation({ question: `Folder "${param}" already exists. Do you want to rewrite it?`, initial: false })

        if (!confirm) {
          signale.error('Canceled')
          process.exit()
        }
      }
    } catch (error) {}

    await generator({ dest, templatesFolder, param, flags: CLI })
    process.exit()
  }

  signale.log(HELP)
  process.exit()
}

main(CLI)
