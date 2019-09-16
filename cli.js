#!/usr/bin/env node
const path = require('path');
const mri = require('mri');
const signale = require('signale');
const readPkgUp = require('read-pkg-up');
const play = require('./src/generator');
const { HELP } = require('./src/help.js');
const setup = require('./src/init.js');
const { readConfigFile } = require('./src/util.js');

const userDir = process.cwd();
const argv = process.argv.slice(2);

const CLI = mri(argv, {
  alias: {
    v: 'version',
    h: 'help',
    i: 'init',
  },
});

const ARGS = CLI._;
const folder = ARGS[0];
const param = ARGS[1];

const { package: packageJSON } = readPkgUp.sync({
  cwd: __dirname,
  normalize: false,
});

const ret = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false,
});

const { package: pkg } = ret || { pkg: {} };

const { commandsPath: commands, templates = './conjurate' } = readConfigFile({
  pkg,
  userDir,
});

if (!Object.keys(commands).includes(folder) && !CLI.init) {
  signale.error(`Command not found, try one of: ${Object.keys(commands)}`);
  process.exit();
}

const dest = CLI.out
  ? path.resolve(userDir, CLI.out, param)
  : path.resolve(userDir, commands[folder], param);

if (CLI.init) {
  setup({ pkg, cwd: userDir })
    .then({})
    .catch(() => process.exit());
}

if (CLI.help) {
  console.log(HELP);
}

if (CLI.version) {
  console.log(packageJSON.version);
}

if (CLI._.length >= 2) {
  play(CLI, { pkg, cwd: userDir, templates, commands, folder, param, dest })
    .then(() => {})
    .catch(error => {
      console.log({ error });
    });
}
