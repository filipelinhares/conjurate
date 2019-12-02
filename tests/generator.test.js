const path = require('path')
const FileTest = require('fileshelf')
const generator = require('../src/generator')

const root = './tests/test-template'
const ft = new FileTest(root)

beforeEach(() => {
  ft.reset('src')
})

afterAll(() => {
  ft.reset('src')
})

describe('generator.js', () => {
  test('Test integration with generator', async () => {
    await generator({
      dest: path.resolve(root, 'src'),
      templatesFolder: path.resolve(root, 'component'),
      param: 'testFile',
      flags: {
        logs: false
      }
    })

    expect(ft.includeDirectory('src')).toBe(true)
    expect(ft.includeDirectory('src/test-file')).toBe(true)
    expect(ft.includeFile('src/test-file/nested-folder/TestFile.js')).toBe(
      true
    )
  })
})
