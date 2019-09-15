#!/usr/bin/env node
const mri = require('mri');
const readPkgUp = require('read-pkg-up');
const play = require('./src/generator');
const { HELP } = require('./src/help.js');
const setup = require('./src/init.js');
const { readConfigFile } = require('./src/util.js');

const {package: packageJSON} = readPkgUp.sync({
  cwd: __dirname,
  normalize: false,
});

const ret = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false,
});

const { package: pkg } = ret || { pkg: {} };

const argv = process.argv.slice(2);
const CLI = mri(argv, {
  alias: {
    v: 'version',
    h: 'help',
    i: 'init'
  }
});
const userDir = process.cwd();

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
  const { commandsPath: commands, templates = './conjurer' } = readConfigFile({
    pkg,
    userDir,
  });

  play(CLI, { pkg, cwd: userDir, templates, commands })
    .then(() => {})
    .catch(error => {
      console.log({ error });
    });
}
