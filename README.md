<a href="https://github.com/filipelinhares/conjurate"><img
  src="https://i.imgur.com/2amDxYd.png" alt="Conjurate Logo"
  width="115" align="right"></a>

# Conjurate

> Easy way to generate your files

[![npm][npm-image]][npm-url] [![license][license-image]][license-url]
[![changelog][changelog-image]][changelog-url] [![travis][travis-img]][travis-url]

## 1.0 Instalation

**1.1 Globally**

```bash
npm install -g conjurate
```

**1.2 Locally**

```bash
npm install --save-dev conjurate
```

```json
{
	"scripts": {
		"gen": "conjurate"
	}
}
```

## 2.0 Getting start

##### 2.1 Create the files of your template using the [5.0 template's](50-templates) placeholder

The name "`component`" must be the same used in the config file in [2.3](#23-change-templates-name-and-default-destination-folder)

```diff
├── conjurate
│   └── component
│       ├── %kebab%.js
│       └── %kebab%.css
├── components
├── package-lock.json
└── package.json
```

```javascript
./conjurate/component/%kebab%.js

import React from 'react';
import %camel%Style from './%kebab%.css' 
```

##### 2.2 Run conjurate initial command to genrate a config file or add the config to package.json

```bash
conjurate --init
```

```diff
├── conjurate
│   └── component
│       ├── %kebab%.js
│       └── %kebab%.css
├── components
├── package-lock.json
+├── .conjurate.json
└── package.json
```

`.conjurate.json`

```json
{
  "templatesRoot": "./conjurate",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
```

##### 2.3 Change templates name and default destination folder

```diff
{
  "templatesRoot": "./conjurate",
  "templates": {
-    "template-name": "./template-destination-dir"
-    "<example-component>": "<example-./src/components>"
+    "component": "./components"
  }
}
```

##### 2.4 Run conjurate passing the `template-name` and the placeholder name

```bash
conjurate component paper-input

✔  success   created ./components/paper-input
```

```diff
├── conjurate
│   └── components
│       ├── %kebab%.js
│       └── %kebab%.css
├── components
│   └── input
+│       ├── paper-input.scss
+│       └── paper-input.js
├── package-lock.json
└── package.json
```

```diff
+./conjurate/input/index.js
+
+import React from 'react';
+import paperInputStyle from './paper-input.css' 
```

## 3.0 Usage

```bash
conjurate <template-name> <placeholder-name> [--out ./output]
```

**3.1 <template-name>**

The template name configured in [2.3](#23-change-templates-name-and-default-destination-folder).

**3.2 <placeholder-name>** 

It will be the generated folder name inside destination folder configured in [2.3](#23-change-templates-name-and-default-destination-folder).

**3.3 --out**` overwrite conjurate config file.

## 4.0 Config

```json
{
  "templatesRoot": "./conjurate",
  "templates": {
    "template-name": "./default-destination-dir"
  }
}
```

***4.1 templatesRoot***

This is the folder where you keep your templates.

```
├── conjurate
├── src
└── package.json
```



**4.2 templates**

Templates have a name and a default destination directory.

The name of the folder **is the same** used in the CLI when you run the generator.

```
├── conjurate
│   └── template-name
│       ├── %camel%.js
│       └── %kebab%.scss
├── src
└── package.json
```

```bash
$ conjurate template-name placeholder-name [--out ./replace/destination/placeholder-dir]
```



## 5.0 Templates

You can use a placeholder when developing your templates to help with customization. It will be replaced by the <placeholder-name> and can be used in files names and in file content. (directory name will be allowed in next versions). _In our example it was `paper-input`._

In the example we used `%camel%` and `%kebab%` but you have more options. They are inherited from [change-chase]() package, eg:

```bash
conjurate component "test string"
```

If you want to use space in the placeholder name use string.

`%camel%`:  => `testString`

`%constant%` => `TEST_STRING`

`%lower%` => `test_string`

`%lcFirst%` => `tEST`

`%no% `do nothing

`%kebab%` => `test-case`

`%pascal%` => `TestString`

`%path%` => `test/string`

`%sentence%` => `Test string`

`%snake%` => `test_string`

`%swap%`=> `TEST STRING`

`%title%` => `Test String`

`%upper%`=> `TEST STRING`

`%ucFirst` => `Test string`

## Development

```bash
npm install
npm test
```

## Roadmap

- [ ] Cli to templates management
- [ ] Templates of conjurate templates

## License

[MIT](LICENSE.md) © Filipe Linhares

[travis-img]: https://travis-ci.org/filipelinhares/conjurate.svg?branch=master
[travis-url]: https://travis-ci.org/filipelinhares/conjurate
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg?style=flat
[changelog-url]: CHANGELOG.md
[license-image]: https://img.shields.io/npm/l/conjurate.svg?style=flat
[license-url]: LICENSE.md
[npm-image]: https://img.shields.io/npm/v/conjurate.svg?style=flat
[npm-url]: https://www.npmjs.com/package/conjurate
