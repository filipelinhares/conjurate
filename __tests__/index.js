const path = require('path');
const FileTest = require('file-test');

const ft = new FileTest(path.resolve(__dirname, './root'));

test('test test', () => {
  expect(ft.includeDirectory('B')).toBe(false);
});
