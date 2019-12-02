const { REGEX_CASES, renderPlaceholders } = require("./placeholders");
const { findAll } = require("./util");

const parseFileAndDirName = ({ placeholder }) => vynil => {
  if (vynil.isDirectory() || vynil.isBuffer()) {
    vynil.path = vynil.path.replace(findAll(REGEX_CASES), match => {
      return renderPlaceholders({ match, replace: placeholder });
    });
  }

  return vynil;
};

const parseFileContent = ({ placeholder }) => vynil => {
  if (vynil.isBuffer()) {
    vynil.contents = Buffer.from(
      String(vynil.contents).replace(findAll(REGEX_CASES), match => {
        return renderPlaceholders({ match, replace: placeholder });
      })
    );
  }

  return vynil;
};

module.exports = {
  parseFileAndDirName,
  parseFileContent
};
