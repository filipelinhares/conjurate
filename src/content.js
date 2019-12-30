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
  ${bold('Conjurate')}@${VERSION} - ${italic(
  'Easy generator tool'
)}

  ${italic(gray('Create config file:'))}
    conjurate --init

  ${italic(gray('Usage:'))}
    conjurate <template-name> <placeholder-name>

  ${italic(gray('Options:'))}
    -t, --templates   print templates listed in your conjurate config
    -o, --output      overwrite the default destination dir for choose template
    -h, --help        show this message
    -v, --version     show version number
    -no-l, --no-logs  do not print template generation info

  ${italic(gray('Docs:'))}
    https://github.com/filipelinhares/conjurate
    https://conjurate.surge.sh
`

module.exports = {
  HELP,
  VERSION,
  printCommands
}
