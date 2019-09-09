const fs = require('fs-extra');
const path = require('path');

const folder = process.argv[2];
const param = process.argv[3];

const templatesFolder = path.resolve(__dirname, `../generator`);
const tmpFolder = path.resolve(__dirname, `../.tmp-generator`, folder);

const findAll = (search) => new RegExp(search, 'g');

if (fs.pathExistsSync('./.tmp-generator')) {
  fs.removeSync('./.tmp-generator');
}

fs.mkdirSync('./.tmp-generator');

fs.copySync(path.join(templatesFolder, folder), path.join(tmpFolder));


const readAndUpdateDir = (files) => {
  files.forEach((file, index) => {
    const fileLocation = path.join(tmpFolder, file)
    const fileStats = fs.statSync(fileLocation);

    if (fileStats.isFile()) {
      const x = fs.readFileSync(fileLocation, 'utf8');
      const l = x.replace(findAll('%%%'), param)
      
      const newFileName = file.replace(findAll('%%%'), param)
      fs.renameSync(fileLocation, path.join(tmpFolder, newFileName));
      fs.writeFileSync(path.join(tmpFolder, newFileName), l);
    }
  });
}

const lol = fs.readdirSync(path.join(tmpFolder));
readAndUpdateDir(lol)

// fs.remove('./.tmp-generator')
