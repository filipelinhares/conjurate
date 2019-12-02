const signale = require("signale");

const fileCreation = () => item => {
  signale.success(`Created ${item.relative}`);
  return item;
};

module.exports = {
  fileCreation
};
