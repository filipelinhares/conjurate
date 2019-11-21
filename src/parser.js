const { REGEX_CASES, renderPlaceholders } = require("./placeholders");
const { findAll } = require("./util");

const parseFileAndDirName = ({ placeholder }) => args => {
  if (args.isDirectory() || args.isBuffer()) {
    args.basename = args.basename.replace(findAll(REGEX_CASES), match => {
      return renderPlaceholders({ match, replace: placeholder });
    });
  }

  return args;
};

const parseFileContent = ({ placeholder }) => args => {
  if (args.isBuffer()) {
    args.contents = Buffer.from(
      String(args.contents).replace(findAll(REGEX_CASES), match => {
        return renderPlaceholders({ match, replace: placeholder });
      })
    );
  }

  return args;
};

module.exports = {
  parseFileAndDirName,
  parseFileContent
};
