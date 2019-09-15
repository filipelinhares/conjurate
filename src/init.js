const path = require('path');
const fs = require('fs-extra');
const prompts = require('prompts');
const writePkg = require('write-pkg');
const { CONJURER_CONFIG_JSON } = require('./help');

const QUESTIONS = [
  {
    type: 'select',
    name: 'place',
    message: 'Where do you want to keep conjurer config?',
    choices: [
      { title: 'package.json', value: 'package.json' },
      { title: '.conjurer.json', value: '.conjurer.json' },
    ],
  },
  {
    type: 'text',
    name: 'templates',
    initial: './conjurer',
    message: `A folder to keep your templates files`,
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Can you confirm?',
    initial: true,
  },
];

const mergeWithPackageConfig = ({ pkg, cwd }) => {
  pkg.conjurer = JSON.parse(CONJURER_CONFIG_JSON);
  const { conjurer } = pkg;

  writePkg.sync(cwd, { ...pkg, conjurer });
};

const setup = async ({ pkg, cwd }) => {
  const response = await prompts(QUESTIONS);
  if (response.confirm && response.place !== 'package.json') {
    await fs.writeFile(
      path.resolve(cwd, '.conjurer.json'),
      CONJURER_CONFIG_JSON,
    );
  }

  if (response.confirm && response.place === 'package.json') {
    mergeWithPackageConfig({ pkg, cwd });
  }
};

module.exports = setup;
