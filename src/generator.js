const path = require('path');
const fs = require('fs-extra');
const walkSync = require('walk-sync');
const tempy = require('tempy');
const { Signale } = require('signale');

const interactive = new Signale({ interactive: true });

const { findAll, caseFn } = require('./util.js');

const REGEX_CASES = /%camel%|%constant%|%lower%|%lcFirst%|%no%|%kebab%|%pascal%|%path%|%sentence%|%snake%|%swap%|%title%|%upper%|%ucFirst%/g;

module.exports = async (cli, { dest, cwd, templates, folder, param }) => {
  const tmpFolder = path.resolve(tempy.directory(), folder);
  const templatesFolder = path.resolve(cwd, templates, folder);

  const follow = await fs.exists(templatesFolder);

  if (!follow) {
    interactive.error(
`${param} template does not exist


`);
    process.exit();
  }

  await fs.copy(templatesFolder, tmpFolder);
  const paths = walkSync(tmpFolder);


  const promises = paths.map(async file => {
    const fileLocation = path.join(tmpFolder, file);
    const fileStat = await fs.stat(fileLocation);

    if (fileStat.isFile()) {
      const x = await fs.readFile(fileLocation, 'utf8');
      const l = x.replace(findAll(REGEX_CASES), match => {
        return caseFn(match)(param);
      });

      const newFileName = fileLocation.replace(findAll(REGEX_CASES), match => {
        return caseFn(match)(param);
      });

      await fs.rename(fileLocation, newFileName);
      await fs.writeFile(newFileName, l);
    }
  });

  await Promise.all(promises);

  await fs.copy(tmpFolder, dest);
  interactive.success(`created ${param}`);

  await fs.remove(tmpFolder);
};
