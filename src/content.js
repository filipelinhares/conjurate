const chalk = require("chalk");
const conjuratePkg = require("../package.json");

const VERSION = conjuratePkg.version;

const printCommands = templates =>
  `
  ${chalk.italic.gray("Your templates:")}
${Object.keys(templates)
  .map(
    t =>
      `  • ${chalk.bold(t)} ⇢ ${chalk.dim("--output:")} ${chalk.italic.gray(
        templates[t]
      )}`
  )
  .join("\n")}
`;

const HELP = `
  ${chalk.bold("Conjurate")}@${VERSION} - ${chalk.italic(
  "Easy scaffolding tool"
)}

  ${chalk.italic.gray("Create config file or add to package.json:")}
    conjurate --init

  ${chalk.italic.gray("Usage:")}
    conjurate <template-name> <placeholder-name>

  ${chalk.italic.gray("Options:")}
    -o, --output      overwrite the default destination dir for choose template.
    -v, --version     show version number
    -h, --help        show this message
    -t, --templates   print templates listed in your conjurate config
    -l, --logs        print template generation info
    -no-l, --no-logs  do not print template generation info

  ${chalk.italic.gray("Docs:")}
    https://github.com/filipelinhares/conjurate
    https://conjurate.surge.sh
`;

const CONJURATE_CONFIG_JSON = `{
  "templatesRoot": "./conjurate",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
`;

module.exports = {
  CONJURATE_CONFIG_JSON,
  HELP,
  VERSION,
  printCommands
};
