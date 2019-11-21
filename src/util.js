const path = require("path");
const { Transform } = require("stream");
const fs = require("fs-extra");
const readPkgUp = require("read-pkg-up");
const resolvePkg = require("resolve-pkg");

const findAll = search => new RegExp(search, "g");

const isEmpty = obj => {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return !obj || (obj && Object.keys(obj).length === 0);
};

const ERRORS = {
  configFile: "CONFIG_FILE_ERROR",
  templatesPackages: "PACKAGE_NOT_FOUND_ERROR"
};

const mapStream = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, _encoding, callback) {
      let res;
      try {
        res = fn(chunk);
      } catch (error) {
        return callback(error);
      }

      callback(null, res);
    }
  });

const readPackagesFile = ({ cwd }) => {
  const userPackageJson = readPkgUp.sync({
    cwd,
    normalize: false
  });

  return {
    userPkg: userPackageJson && userPackageJson.packageJson
  };
};

const readConfigFile = async ({ pkg, cwd }) => {
  let config = pkg.conjurate;
  if (isEmpty(config)) {
    const configPath = path.resolve(cwd, "./.conjurate.json");
    const exists = await fs.exists(configPath);

    if (!exists) {
      return { error: ERRORS.configFile };
    }

    const configJSON = await fs.readFile(configPath);
    config = JSON.parse(configJSON);
  }

  let { templatesRoot, templates } = config;

  if (templatesRoot.startsWith("~")) {
    const pkgTemplates = templatesRoot.slice(1);
    const pkgTemplatesRoot = resolvePkg(pkgTemplates);

    if (!pkgTemplatesRoot) {
      return { error: ERRORS.templatesPackage, templatesRoot: pkgTemplates };
    }

    const pkgTempaltesPath = path.resolve(pkgTemplatesRoot, "templates");
    const exists = await fs.exists(pkgTempaltesPath);

    if (!exists) {
      return { error: ERRORS.configFile };
    }

    templatesRoot = pkgTempaltesPath;
    templates = require(pkgTemplatesRoot);
  }

  if (isEmpty(templates) || isEmpty(templatesRoot)) {
    return { error: ERRORS.configFile };
  }

  return { templates, templatesRoot };
};

module.exports = {
  findAll,
  isEmpty,
  ERRORS,
  mapStream,
  readPackagesFile,
  readConfigFile
};
