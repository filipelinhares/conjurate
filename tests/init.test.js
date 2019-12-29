const FileTest = require('fileshelf')
const { setup } = require('../src/init')

const root = './tests/test-template'
const ft = new FileTest(root)

const CONJURATE_CONFIG_JSON = `{
  "templatesSource": "./conjurate",
  "templates": {
    "<template-name>": "./<default-output>"
  }
}
`

const FLAGS = {
  logs: false
}

afterAll(() => {
  ft.reset('.conjurate.json')
})

beforeEach(() => {
  ft.reset('.conjurate.json')
})

describe.only('init.js', () => {
  test('testing creation of .conjurate.json', async () => {
    const response = {
      confirm: true,
      answer: './conjurate'
    }

    await setup({ response, cwd: root, flags: FLAGS })

    expect(ft.includeFile('.conjurate.json')).toBe(true)
    expect(ft.readFile('.conjurate.json')).toBe(CONJURATE_CONFIG_JSON)
  })
})
