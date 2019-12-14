const fs = require('fs-extra')
const path = require('path')
const resolvePkg = require('resolve-pkg')
const { isEmpty } = require('./util')

const readConfigFile = async (cwd) => {
  const configPath = path.resolve(cwd, './.conjurate.json')
  const existsConfigFile = await fs.exists(configPath)

  if (!existsConfigFile) {
    return {
      error: `Conjurate config malformed or does not exists.

      Try running "conjurate --init"`
    }
  }

  const configJSON = await fs.readFile(configPath, 'utf8')

  try {
    const cfg = JSON.parse(configJSON)
    return { ...cfg }
  } catch (e) {
    return {
      error: 'Check if your .conjurate.json is a valid JSON file'
    }
  }
}

const loadNpmTemplate = async (npmTemplate) => {
  const npmTemplatePath = resolvePkg(npmTemplate)

  if (!npmTemplatePath) {
    return {
      error: `${npmTemplate} is defined as "npmTemplate" but does not exist

      Try running "npm install"`
    }
  }

  const pkgTempaltesPath = path.resolve(npmTemplatePath, 'templates')
  const exists = await fs.exists(pkgTempaltesPath)

  if (!exists) {
    return { error: `Missing folder ./templates inside ${npmTemplate} package` }
  }

  return { templatesSource: pkgTempaltesPath, templates: require(npmTemplatePath) }
}

const parseConfig = async ({ cwd }) => {
  const { templatesSource, templates, error: readFileError } = await readConfigFile(cwd)

  if (readFileError) {
    return { error: readFileError }
  }

  if (templatesSource.startsWith('npm:')) {
    const [, npmTemplate] = templatesSource.split('npm:')
    const { error: npmError, ...loadedNpm } = await loadNpmTemplate(npmTemplate)
    if (npmError) {
      return { error: npmError }
    }
    return loadedNpm
  }

  if (!isEmpty(templates) && !isEmpty(templatesSource)) {
    return { templates, templatesSource }
  }
}

module.exports = parseConfig
