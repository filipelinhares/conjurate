const fs = require("fs-extra");
const path = require("path");
const walkSync = require("walk-sync");
const ARGS = process.argv;

if (ARGS.length < 4) {
  console.log("faz direito po");
  process.exit(1);
}

const folder = ARGS[2];
const param = ARGS[3];
const dest = ARGS[4];

const templatesFolder = path.resolve(__dirname, `../generator`, folder);
const tmpFolder = path.resolve(__dirname, `../.tmp-generator`, folder);

const findAll = search => new RegExp(search, "g");

if (fs.pathExistsSync("./.tmp-generator")) {
  fs.removeSync("./.tmp-generator");
}

fs.mkdirSync("./.tmp-generator");

fs.copySync(templatesFolder, tmpFolder);

const paths = walkSync(tmpFolder);

paths.forEach(file => {
  const fileLocation = path.join(tmpFolder, file);
  const fileStat = fs.statSync(fileLocation);

  if (fileStat.isFile()) {
    const x = fs.readFileSync(fileLocation, "utf8");
    const l = x.replace(findAll("%%%"), param);

    const newFileName = fileLocation.replace(findAll("%%%"), param);
    fs.renameSync(fileLocation, newFileName);
    console.log(newFileName);
    fs.writeFileSync(newFileName, l);
  }
});

fs.copySync(path.join(tmpFolder), dest);
fs.remove("./.tmp-generator");
