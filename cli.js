#!/usr/bin/env node
const path = require('path');
const mri = require('mri');
const signale = require('signale');
const generator = require('./src/generator');
const { HELP, COMMANDS } = require('./src/content.js');
const setup = require('./src/init.js');
const conjuratePkg = require('./package.json');
const { readConfigFile, readPackagesFile } = require('./src/util.js');

const userDir = process.cwd();
const argv = process.argv.slice(2);

const CLI = mri(argv, {
  alias: {
    v: 'version',
    h: 'help',
    i: 'init',
    c: 'commands',
    t: 'templates'
  },
});

if (CLI.version) {
  signale.log(conjuratePkg.version);
  process.exit();
}

if (CLI.help) {
  signale.log(HELP);
  process.exit();
}

const { userPkg } = readPackagesFile({ cwd: userDir });

if (CLI.init) {
  setup({ pkg: userPkg, cwd: userDir })
    .then(() => process.exit())
    .catch(() => process.exit());
}

const {
  error: configFileError,
  templates,
  templatesRoot = './conjurate',
} = readConfigFile({
  pkg: userPkg,
  cwd: userDir,
});

if (configFileError) {
  signale.error(`No config file for Conjurate, try run $ conjurate --init`);
  process.exit();
}

if (CLI.commands || CLI.templates) {
  signale.log(COMMANDS(templates))
  process.exit();
}

if (!CLI.init) {
  const ARGS = CLI._;
  const folder = ARGS[0];
  const param = ARGS[1];

  if (!Object.keys(templates).includes(folder) && !CLI.init) {
    signale.error(`Command not found, try one of: ${Object.keys(templates)}`);
    process.exit();
  }

  const dest = CLI.out
    ? path.resolve(userDir, CLI.out, param)
    : path.resolve(userDir, templates[folder], param);

  if (CLI._.length >= 2) {
    generator(CLI, {
      cwd: userDir,
      templatesRoot,
      templates,
      folder,
      param,
      dest,
    })
      .then(({ message }) => {
        signale.complete(message);
        process.exit();
      })
      .catch(error => {
        signale.error(error.message);
        process.exit();
      });
  }
}
