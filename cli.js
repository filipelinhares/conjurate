#!/usr/bin/env node
const path = require('path');
const mri = require('mri');
const signale = require('signale');
const generator = require('./src/generator');
const { HELP, printCommands, VERSION } = require('./src/content.js');
const setup = require('./src/init.js');
const { readConfigFile, readPackagesFile, ERRORS, isEmpty } = require('./src/util.js');

const userDir = process.cwd();
const argv = process.argv.slice(2);

const CLI = mri(argv, {
  alias: {
    v: 'version',
    h: 'help',
    i: 'init',
    t: 'templates',
    o: 'output',
  },
});

if (CLI.version) {
  signale.log(VERSION);
  process.exit();
}

if (CLI.help || isEmpty(argv)) {
  signale.log(HELP);
  process.exit();
}

async function main (cli) {
  const { userPkg } = readPackagesFile({ cwd: userDir });

  if (cli.init) {
    await setup({ pkg: userPkg, cwd: userDir })
    process.exit();
  }

  const {
    error: configFileError,
    templates,
    templatesRoot = './conjurate',
  } = await readConfigFile({
    pkg: userPkg,
    cwd: userDir,
  });

  if (configFileError === ERRORS.configFile) {
    signale.error(`Conjurate config malformed or does not exists. Try running $ conjurate --init`);
    process.exit();
  }

  if (configFileError === ERRORS.templatesPackage) {
    signale.error(`Package ${templatesRoot} not found, try npm install --save-dev ${templatesRoot}`);
    process.exit();
  }

  if (cli.templates) {
    signale.log(printCommands(templates))
    process.exit();
  }

  else {
    const ARGS = cli._;
    const folder = ARGS[0];
    const param = ARGS[1];

    if (!Object.keys(templates).includes(folder) && !cli.init) {
      signale.error(
        `Command not found, try one of:
          ${printCommands(templates)}`
      );
      process.exit();
    }

    const dest = cli.output
      ? path.resolve(userDir, cli.out, param)
      : path.resolve(userDir, templates[folder], param);

    if (cli._.length >= 2) {
      await generator(cli, {
        cwd: userDir,
        templatesRoot,
        templates,
        folder,
        param,
        dest,
      });
    }
  }
}

main(CLI);
