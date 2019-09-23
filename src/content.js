const chalk = require('chalk');
const conjuratePkg = require('../package.json');

const VERSION = conjuratePkg.version;

const printCommands = templates => (
  `
  ${chalk.bold('Conjurate')} - Easy file generation

  ${chalk.italic.gray('Your templates:')}
${Object.keys(templates).map(t => `  • ${chalk.bold(t)} ⇢ ${chalk.italic.gray(templates[t])}`).join('\n')}
`
)

const HELP = `
  ${chalk.bold('Conjurate')}@${VERSION} - ${chalk.italic('Easy structure generation')}
  
  ${chalk.italic.gray('Create config file or add to package.json:')}
    conjurate --init

  ${chalk.italic.gray('Usage:')}
    conjurate <template-name> <placeholder-name>

  ${chalk.italic.gray('Options:')}
    -o, --out        overwrite the default destination dir for choose template.
    -v, --version    show version number
    -h, --help       show this message
    -t, --templates  print templates listed in your conjurate config

  ${chalk.italic.gray('Docs:')}
    github.com/filipelinhares/conjurate
`;

const CONJURATE_CONFIG_JSON =
`{
  "templatesRoot": "./conjurate",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
`

module.exports = {
  CONJURATE_CONFIG_JSON,
  HELP,
  VERSION,
  printCommands,
}
