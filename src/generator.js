const path = require('path');
const fs = require('fs-extra');
const walkSync = require('walk-sync');
const tempy = require('tempy');
const signale = require('signale');

const { REGEX_CASES, parsePlaceholders } = require('./parser');
const { findAll } = require('./util.js');

module.exports = async (
  cli,
  { dest, cwd, templatesRoot, templates, folder, param },
) => {
  signale.success('start generating...');
  const tmpFolder = path.resolve(tempy.directory(), folder);
  const templatesFolder = path.resolve(cwd, templatesRoot, folder);

  const follow = await fs.exists(templatesFolder);

  if (!follow) {
    throw new Error(`${templatesRoot}/${folder} template does not exist`);
  }

  await fs.copy(templatesFolder, tmpFolder);
  const paths = walkSync(tmpFolder);

  const promises = paths.map(async file => {
    const fileLocation = path.join(tmpFolder, file);
    const fileStat = await fs.stat(fileLocation);

    if (fileStat.isFile()) {
      const x = await fs.readFile(fileLocation, 'utf8');
      const l = x.replace(findAll(REGEX_CASES), match => {
        return parsePlaceholders({ match, replace: param });
      });

      const newFileName = fileLocation.replace(findAll(REGEX_CASES), match => {
        return parsePlaceholders({ match, replace: param })
      });

      await fs.rename(fileLocation, newFileName);
      await fs.writeFile(newFileName, l);
      signale.success(`${path.basename(newFileName)} created!`);
    }
  });

  await Promise.all(promises);

  await fs.copy(tmpFolder, dest);

  await fs.remove(tmpFolder);

  return { message: `${folder} created in ${templates[folder]}/${param}` };
};
