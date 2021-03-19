
import { extendConfig, getPath, isExist, isExistTs, loadYml, pushDeps, pushSafe, writeFile, writeFileSafe } from "../utils"
import { eslintConfigTmpl, eslintRules } from "../template/eslint"
import { editorConfigTmpl } from "../template/editorConfig"

const editorconfigName = `.editorconfig`
const eslintFiles = [
  `.eslintrc.js`,
  `.eslintrc.cjs`,
  `.eslintrc.yaml`,
  `.eslintrc.yml`,
  `.eslintrc.json`
]

export const addEslint = (hasEditorConfig: boolean) => {
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

  replaceEslint(config, hasEditorConfig)

  if (/\.ya?ml$/g.test(filename)) {
    writeFile(filename, config)
  } else {
    writeFile(filename, (/\.json$/g.test(filename) ? '' : `module.exports = `) + JSON.stringify(config, null, '  '))
  }
}

function replaceEslint(config, hasEditorConfig: boolean) {
  extendConfig(config, eslintConfigTmpl)
  config.plugins = config.plugins || []
  config.extends = config.extends || []
  const eslintRec = `eslint:recommended`
  pushSafe(config.extends, `eslint:recommended`)

  pushDeps(undefined, 'eslint')

  if (hasEditorConfig || isExist(editorconfigName)) {
    replaceRule(config)
  }
  if (isExistTs()) {
    config.parser = '@typescript-eslint/parser'
    pushSafe(config.plugins, `@typescript-eslint`)
    pushSafe(config.extends, `plugin:@typescript-eslint/recommended`)
    if (config.extends.includes(eslintRec)) {
      config.extends.splice(config.extends.indexOf(eslintRec), 1)
    }

    pushDeps(undefined, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`)
  }
}

function replaceRule(config) {
  config.rules = config.rules || {}

  Object.keys(eslintRules).map(key => {
    const rule = eslintRules[key]
    config.rules[key] = config.rules[key] || rule
  })

  // config.rules.quotes = config.rules.quotes || [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }]
}

export const addTs = () => {
  pushDeps(undefined, `@types/node`, `typescript`)

  writeFileSafe(`tsconfig.json`, `{
    "compilerOptions": {
      "outDir": "./",
      "target": "ES6",
      "module": "CommonJS",
      "allowJs": false,
      "esModuleInterop": true,
      "isolatedModules": false,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true
    },
    "include": ["src"],
    "exclude": ["__test__"]
  }`)
}

export const addEditorConfig = () => {
  writeFileSafe(editorconfigName, editorConfigTmpl)
}
