# WIP Conjurate

## Instalation

**Globally**

```bash
npm install -g conjurate
```

**Locally**

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

## Set up

```
conjurate --init
```

## Config

```json
{
  "templatesRoot": "./conjurate",
  "templates": {
    "template-name": "./default-destination-dir"
  }
}
```
***templatesFolder***

**commands**

#### Example

```json
{
  "templatesRoot": "./conjurate",
  "templates": {
    "component": "./src/components"
  }
}
```



```bash
# Globally
conjurate component input

✔  success   created ./src/components/input
```



## Tempates

TODO



#### Example

```reStructuredText
├── conjurate
│   └── components
│       ├── %kebab%.js
│       └── %kebab%.css
├── components
├── package-lock.json
└── package.json
```



```javascript
./conjurate/input/index.js

import React from 'react';
import %camel%Style from './%kebab%.css' 
```

##### Result

```
├── conjurate
│   └── components
│       ├── %kebab%.js
│       └── %kebab%.css
├── components
│   └── input
│       ├── paper-input.scss
│       └── paper-input.js
├── package-lock.json
└── package.json
```

```javascript
./conjurate/input/index.js

import React from 'react';
import paperInputStyle from './paper-input.css' 
```

## Usage

TODO

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
