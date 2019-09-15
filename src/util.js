const path = require('path');
const fs = require('fs-extra');
const changeCase = require('change-case');

const findAll = search => new RegExp(search, 'g');

const isEmpty = obj => (obj && Object.keys(obj).length === 0);

const caseFn = match => changeCase[match.replace(/%/g, '')];

const readConfigFile = ({ pkg, cwd }) => {
  const config = pkg.conjurer;

  if (isEmpty(config)) {
    try {
      const configPath = path.resolve(cwd, './.conjurer.json');
      const file = fs.readFileSync(configPath);
      return JSON.parse(file);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('Has no config for the wekead');
      }
    }
  }

  return config;
};

module.exports = {
  findAll,
  readConfigFile,
  caseFn,
};
