const path = require("path");
const vfs = require("vinyl-fs");
const log = require("./logs");

const { mapStream, condPipe } = require("./util.js");
const { parseFileAndDirName, parseFileContent } = require("./parser");

module.exports = ({ dest, templatesFolder, param, flags }) => {
  return new Promise(resolve => {
    vfs
      .src([path.resolve(templatesFolder, "**/*")])
      .pipe(mapStream(parseFileAndDirName({ placeholder: param })))
      .pipe(mapStream(parseFileContent({ placeholder: param })))
      .pipe(condPipe(flags.logs, log.fileCreation()))
      .pipe(vfs.dest(dest))
      .on("end", resolve);
  });
};
