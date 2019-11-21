const path = require("path");
const vfs = require("vinyl-fs");
const log = require("./log");

const { mapStream } = require("./util.js");
const { parseFileAndDirName, parseFileContent } = require("./parser");

module.exports = ({ dest, templatesFolder, param }) => {
  return vfs
    .src([path.resolve(templatesFolder, "**/*")])
    .pipe(mapStream(parseFileAndDirName({ placeholder: param })))
    .pipe(mapStream(parseFileContent({ placeholder: param })))
    .pipe(mapStream(log.fileCreation()))
    .pipe(vfs.dest(dest));
};
