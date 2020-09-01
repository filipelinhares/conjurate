const gray = require('ansi-gray')
const dim = require('ansi-dim')
const italic = require('ansi-italic')
const bold = require('ansi-bold')
const conjuratePkg = require('../package.json')

const VERSION = conjuratePkg.version

const printCommands = templates =>
  `
  ${italic(gray('Your templates:'))}
${Object.keys(templates)
  .map(
    t =>
      `  • ${bold(t)} ⇢ ${dim('--output:')} ${italic(gray(
        templates[t]
      ))}`
  )
  .join('\n')}
`

const HELP = `
  ${bold(gray('Set up:'))}
    conjurate --init

  ${bold(gray('Usage:'))}
    conjurate <template-name> <placeholder-name>

  ${bold(gray('Options:'))}
    -o,  --output      overwrite the default output folder
    -fl, --flat        generate structure without a container folder
    -t,  --templates   show list of available templates
    -v,  --version     show version number
    -h,  --help        show this message

  ${bold(gray('Docs:'))}
    https://github.com/filipelinhares/conjurate
    https://conjurate.surge.sh

 ${italic(bold('% Conjurate'))}@${VERSION}
`

module.exports = {
  HELP,
  VERSION,
  printCommands
}
