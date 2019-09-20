const path = require('path');
const fs = require('fs-extra');
const readPkgUp = require('read-pkg-up');
const resolvePkg = require('resolve-pkg');

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

  let { templatesRoot, templates } = config;
  if (templatesRoot.startsWith('~')) {
    const pkgTemplates = templatesRoot.substring(1);
    const pkgTemplatesRoot = resolvePkg(pkgTemplates);
    const pkgTempaltesPath = path.resolve(pkgTemplatesRoot, 'templates');
    const exists = fs.existsSync(pkgTempaltesPath);
    if (!exists) {
      return { error: true };
    }
    templatesRoot = pkgTempaltesPath;
    templates = require(pkgTemplates);
  }

  return { templates, templatesRoot};
};

const readPackagesFile = ({ cwd }) => {
  const userPackageJson = readPkgUp.sync({
    cwd,
    normalize: false,
  });

  return { 
    userPkg: userPackageJson && userPackageJson.package,
  };
}

module.exports = {
  findAll,
  readConfigFile,
  readPackagesFile,
};
