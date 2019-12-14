<a href="https://github.com/filipelinhares/conjurate"><img
  src="https://i.imgur.com/2amDxYd.png" alt="Conjurate Logo"
  width="115" align="right"></a>

# Conjurate

> Easy way to generate your files

[![npm][npm-image]][npm-url] [![license][license-image]][license-url]
[![changelog][changelog-image]][changelog-url] [![travis][travis-img]][travis-url]

## 1.0 Instalation

### 1.1 Global

```bash
npm install -g conjurate
```

### 1.2 Local

```bash
npm install --save-dev conjurate
```

```json
// package.json
{
  "scripts": {
    "gen": "conjurate"
  }
}
```

### 1.3 npx

```bash
npx conjurate
```

## 2.0 Get started

Let's start with an component library example

```diff
├── components
└── package.json
```

#### 2.1 Run conjurate initial command to generate a config file.

>  ℹ️ Note: If you are using npm scripts, you need to run **`npm run gen -- --init`** to pass arguments to conjurate.

```bash
conjurate --init
```

```diff
├── components
+├── .conjurate.json
└── package.json
```

`.conjurate.json`

```json
{
  "templatesSource": "./conjurate",
  "templates": {
    "<template-name>": "./<default-destination-dir>",
    "<example-component>": "<example-./src/components>"
  }
}
```

#### 2.2 Change templates name and default destination folder

```diff
{
  "templatesSource": "./conjurate",
  "templates": {
-    "template-name": "./template-destination-dir"
-    "<example-component>": "<example-./src/components>"
+    "component": "./components"
  }
}
```

#### 2.3 Create templatesSource folter in `./conjurate` and the `component` template inside of it using the [5.0 template's](#50-templates) placeholder

The name of the folder (`component`) must be the same used in the config file in [2.2](#22-change-templates-name-and-default-destination-folder)

```diff
+├── conjurate
+│   └── component
+│       ├── %kebab-case%.js
+│       └── %kebab-case%.css
├── components
├── .conjurate.json
└── package.json
```

```javascript
./conjurate/component/%kebab%.js

import React from 'react';
import %camel-case%Style from './%kebab-case%.css' 
```

#### 2.4 Run conjurate passing the `template-name` and the `placeholder-content`

```bash
conjurate component paper-input

✔  success   created ./components/paper-input
```

```diff
├── conjurate
│   └── components
│       ├── %kebab-case%.js
│       └── %kebab-case%.css
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

## 3.0 CLI

### 3.1.1 Generate command:
```bash
conjurate <template-name> <placeholder-content> [--output ./output]
```

#### 3.1.2 Template name
`<template-name>`

The template name configured in [2.3](#23-create-templatesroot-folter-in-conjurate-and-the-component-template-inside-of-it-using-the-50-templates-placeholder).

#### 3.1.3 Placeholders
`<placeholder-content>`

It will be the generated folder name inside destination folder configured in [2.3](#23-create-templatesroot-folter-in-conjurate-and-the-component-template-inside-of-it-using-the-50-templates-placeholder).

### 3.2 Change output dir
- `--output`
- alias `-o`

Overwrite default-destination-dir in config file for used template.

### 3.3 List your templates configured in Conjurate __[config](#42-templates)__
- `--templates`
- alias: `-t`

### 3.4 Show help message
- `--help`
- alias: `-h`

### 3.5 Output generation log messages
- `--logs`
- alias: `-l`
- default: `true`
- _disable:_ `--no-logs`

## 4.0 Config

```json
{
  "templatesSource": "./conjurate",
  "templates": {
    "template-name": "./default-destination-dir"
  }
}
```

### 4.1 `templatesSource`

This is the folder where you keep your templates, the default is `./conjurate`.

```
├── conjurate
├── src
└── package.json
```
#### 4.1.1 Using npm packages
If you want to keep your templates outside of your project, you can create a package with your templates.

In [5.3 Template package](#53-template-package) you can learn how to.

```json
{
  "templatesSource": "npm:package-name",
}
```

### 4.2 templates

Templates have a name and a default destination directory.

The name of the folder is the same used in the CLI when you run the generator.

```
├── conjurate
│   └── template-name
│       ├── %camel-case%.js
│       └── %kebab-case%.scss
├── src
└── package.json
```

```bash
$ conjurate template-name placeholder-content [--output ./replace/destination/placeholder-dir]
```

## 5.0 Templates


#### 5.1 `templatesSource` structure
Each folder inside your `templatesSource` is a template.


#### 5.2 Placeholders
You can use a placeholders when developing your templates to help with customization. It will be replaced by the <placeholder-content> passed in the CLI and can be used in files name, files content and folders name. In our example it was `paper-input`._

In the example we used `%camel-case%` and `%kebab-case%` but you have more options:

| Placeholders | Result of "test string"|
| --- | -- |
|`%camel-case%` | `testString` |
|`%lower-case%` | `test_string` |
|`%no-case%` | `test string` |
|`%dot-case%` | `test.string` |
|`%dash-case%` | `test-case` |
|`%pascal-case%` | `TestCase` |
|`%path-case%` | `test/case` |
|`%snake-case%` | `test_string` |
|`%swap-case%` | `TEST CASE` |
|`%title-case%` | `Test case` |
|`%upper-case%` | `TEST_STRING` |
|`%first-word%` | `test` |
|`%last-word%` | `case` |


>  ℹ️ If you want to use spaces when using the CLI, use quotes.

```bash
conjurate component "test string"
```

#### 5.3 Template package

If you want to keep your templates files from your project, you can create a npm package.

You can use the [create-conjurate-template](https://github.com/filipelinhares/create-conjurate-template) repository if you want.

###### 5.3.1 Clone:
```bash
git clone git@github.com:filipelinhares/create-conjurate-template.git your-template-name
cd your-template-name
npx trash .git
```
###### 5.3.2 Configure your ./index.js as you do in templates config inside .conjurate.json

```js
module.exports = {
  component: './src/components'
}
```

###### 5.3.3 Create your template folders inside ./templates, eg:
```
`-- templates
    `-- example
        `-- %dash-case%.js
```

Now inside your project, just configure your new template package:

```json
{
  "templatesSource": "npm:package-name",
}
```

****

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
