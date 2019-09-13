const fs = require("fs-extra");
const path = require("path");
const walkSync = require("walk-sync");
const caase = require('change-case');
const chalk = require('chalk');
const package = require('../package.json');

const { findAll } = require('./util.js');

const ARGS = process.argv;

if (ARGS.length < 4) {
  console.log(chalk.red("Wrong number of arguments"))
  process.exit(1);
}

const folder = ARGS[2];
const param = ARGS[3];
const dest = ARGS[4];

const REGEX_CASES = /%camel%|%constant%|%lower%|%lcFirst%|%no%|%kebab%|%pascal%|%path%|%sentence%|%snake%|%swap%|%title%|%upper%|%ucFirst%/g

const templatesFolder = path.resolve(__dirname, `../generator`, folder);
const tmpFolder = path.resolve(__dirname, `../.tmp-generator`, folder);

if (fs.pathExistsSync("./.tmp-generator")) {
  fs.removeSync("./.tmp-generator");
}

fs.mkdirSync("./.tmp-generator");

fs.copySync(templatesFolder, tmpFolder);

const paths = walkSync(tmpFolder);

console.log(walkSync(tmpFolder, {ignore: ['files']}))

paths.forEach(file => {
  const fileLocation = path.join(tmpFolder, file);
  const fileStat = fs.statSync(fileLocation);

  if (fileStat.isFile()) {
    const x = fs.readFileSync(fileLocation, "utf8");
    const l = x.replace(findAll(REGEX_CASES), (match, param) => {
      return caase[match.replace(/%/g, '')](param);
    });

    const newFileName = fileLocation.replace(findAll(REGEX_CASES), (match, param) => {
      return caase[match.replace(/%/g, '')](param);
    });

    fs.renameSync(fileLocation, newFileName);
    fs.writeFileSync(newFileName, l);
  }
});

fs.copySync(tmpFolder, dest);

fs.remove("./.tmp-generator");
