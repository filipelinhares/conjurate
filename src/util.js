const path = require('path');
const fs = require('fs-extra');
const readPkgUp = require('read-pkg-up');

const findAll = search => new RegExp(search, 'g');

const isEmpty = obj => !obj || (obj && Object.keys(obj).length === 0);

const readConfigFile = ({ pkg, cwd }) => {
  let config = pkg.conjurate;

  if (isEmpty(config)) {
    const configPath = path.resolve(cwd, './.conjurate.json');
    const exists = fs.existsSync(configPath);

    if (!exists) {
      return { error: true };
    }

    const configJSON = fs.readFileSync(configPath);
    config = JSON.parse(configJSON);
  }

  let { templatesRoot } = config;
  if (templatesRoot.startsWith('~')) {
    templatesRoot = resolvePkg(templatesRoot.substring(1));
  }

  return { ...config, templatesRoot};
};

const readPackagesFile = ({ cwd }) => {
  const conjuratePackageJSON = readPkgUp.sync({
    cwd: __dirname,
    normalize: false,
  });

  const userPackageJson = readPkgUp.sync({
    cwd,
    normalize: false,
  });

  return { 
    userPkg: userPackageJson && userPackageJson.package,
    conjuratePkg: conjuratePackageJSON && conjuratePackageJSON.package,
  };
}

module.exports = {
  findAll,
  readConfigFile,
  readPackagesFile,
};
