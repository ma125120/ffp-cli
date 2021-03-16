
import { extendConfig, getPath, installDeps, isExist, loadYml, pushSafe, writeFile } from "../utils"
import { eslintConfigTmpl, eslintRules } from "../template/eslint"
import { editorConfigTmpl } from "../template/editorConfig"

const eslintFiles = [
  `.eslintrc.js`,
  `.eslintrc.cjs`,
  `.eslintrc.yaml`,
  `.eslintrc.yml`,
  `.eslintrc.json`,
]

export const addEslint = (hasEditorConfig: boolean, hasTs: boolean,) => {
  let filename = '';
  let config;

  for (let i = 0; i < eslintFiles.length; i++) {
    const file = getPath(eslintFiles[i])
    if (isExist(file)) {
      filename = file;
      if (/\.ya?ml$/g.test(file)) {
        config = loadYml(file)
      } else {
        config = require(file)
      }
      break;
    }
  }
  if (!config) {
    filename = eslintFiles[0];
    config = eslintConfigTmpl
  }
  if (hasEditorConfig) {
    writeFile(`.editorconfig`, editorConfigTmpl)
  }

  replaceEslint(config, hasEditorConfig, hasTs)

  if (/\.ya?ml$/g.test(filename)) {
    writeFile(filename, config)
  } else {
    writeFile(filename, (/\.json$/g.test(filename) ? '' : `module.exports = `) + JSON.stringify(config, null, '\t'))
  }
}

function replaceEslint(config, hasEditorConfig: boolean, hasTs: boolean,) {
  extendConfig(config, eslintConfigTmpl)
  config.plugins = config.plugins || []
  config.extends = config.extends || []
  pushSafe(config.extends, `eslint:recommended`)

  const devDependencies = [`eslint`]
  const dependencies = []

  if (hasEditorConfig) {
    replaceRule(config)
  }
  if (hasTs) {
    config.parser = '@typescript-eslint/parser'
    pushSafe(config.plugins, `@typescript-eslint`)
    pushSafe(config.extends, `plugin:@typescript-eslint/recommended`)

    devDependencies.push(`@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `typescript`)
  }

  installDeps(dependencies, devDependencies)
}

function replaceRule(config) {
  config.rules = config.rules || {}

  Object.keys(eslintRules).map(key => {
    const rule = eslintRules[key]
    config.rules[key] = config.rules[key] || rule
  })

  // config.rules.quotes = config.rules.quotes || [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }]
}