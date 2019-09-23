const chalk = require('chalk');

const printCommands = templates => (
  `
  ${chalk.bold('Conjurate')} - Easy file generation

  ${chalk.italic.gray('Your commands:')}
${Object.keys(templates).map(t => `  • ${chalk.bold(t)} ⇢ ${chalk.italic.gray(templates[t])}`).join('\n')}
`
)

const HELP = `
  ${chalk.bold('Conjurate')} - Easy file generation
  
  ${chalk.italic.gray('Start a project:')}
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
  printCommands,
}
