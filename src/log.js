const signale = require("signale");

const fileCreation = () => item => {
  signale.success(item.relative);
};

module.exports = {
  fileCreation
};
