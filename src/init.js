const path = require("path");
const fs = require("fs-extra");
const writePkg = require("write-pkg");
const signale = require("signale");
const { CONJURATE_CONFIG_JSON } = require("./content");

const QUESTIONS = [
  {
    type: "select",
    name: "place",
    message: "Where do you want to keep conjurate config?",
    choices: [
      { title: "package.json", value: "package.json" },
      { title: ".conjurate.json", value: ".conjurate.json" }
    ]
  },
  {
    type: "text",
    name: "templates",
    initial: "./conjurate",
    message: `A folder to keep your templates files`
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Can you confirm?",
    initial: true
  }
];

const mergeWithPackageConfig = ({ pkg = {}, cwd }) => {
  pkg.conjurate = JSON.parse(CONJURATE_CONFIG_JSON);
  const { conjurate } = pkg;

  writePkg.sync(cwd, {
    ...pkg,
    conjurate
  });
};

const setup = async ({ pkg, cwd, response, flags }) => {
  if (response.confirm && response.place !== "package.json") {
    await fs.writeFile(
      path.resolve(cwd, ".conjurate.json"),
      CONJURATE_CONFIG_JSON
    );
    if (flags.logs) signale.success(`Created .conjurate.json`);
  }

  if (response.confirm && response.place === "package.json") {
    mergeWithPackageConfig({ pkg, cwd });
    if (flags.logs) signale.success(`Config added to your package.json`);
  }
};

module.exports = {
  setup,
  QUESTIONS
};
