"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEditorConfig = exports.addTs = exports.addEslint = void 0;
const utils_1 = require("../utils");
const eslint_1 = require("../template/eslint");
const editorConfig_1 = require("../template/editorConfig");
const editorconfigName = `.editorconfig`;
const eslintFiles = [
    `.eslintrc.js`,
    `.eslintrc.cjs`,
    `.eslintrc.yaml`,
    `.eslintrc.yml`,
    `.eslintrc.json`
];
const addEslint = (hasEditorConfig) => {
    let filename = '';
    let config;
    for (let i = 0; i < eslintFiles.length; i++) {
        const file = utils_1.getPath(eslintFiles[i]);
        if (utils_1.isExist(file)) {
            filename = file;
            if (/\.ya?ml$/g.test(file)) {
                config = utils_1.loadYml(file);
            }
            else {
                config = require(file);
            }
            break;
        }
    }
    if (!config) {
        filename = eslintFiles[0];
        config = eslint_1.eslintConfigTmpl;
    }
    replaceEslint(config, hasEditorConfig);
    if (/\.ya?ml$/g.test(filename)) {
        utils_1.writeFile(filename, config);
    }
    else {
        utils_1.writeFile(filename, (/\.json$/g.test(filename) ? '' : `module.exports = `) + JSON.stringify(config, null, '  '));
    }
};
exports.addEslint = addEslint;
function replaceEslint(config, hasEditorConfig) {
    utils_1.extendConfig(config, eslint_1.eslintConfigTmpl);
    config.plugins = config.plugins || [];
    config.extends = config.extends || [];
    const eslintRec = `eslint:recommended`;
    utils_1.pushSafe(config.extends, `eslint:recommended`);
    utils_1.pushDeps(undefined, 'eslint');
    if (hasEditorConfig || utils_1.isExist(editorconfigName)) {
        replaceRule(config);
    }
    if (utils_1.isExistTs()) {
        config.parser = '@typescript-eslint/parser';
        utils_1.pushSafe(config.plugins, `@typescript-eslint`);
        utils_1.pushSafe(config.extends, `plugin:@typescript-eslint/recommended`);
        if (config.extends.includes(eslintRec)) {
            config.extends.splice(config.extends.indexOf(eslintRec), 1);
        }
        utils_1.pushDeps(undefined, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`);
    }
}
function replaceRule(config) {
    config.rules = config.rules || {};
    Object.keys(eslint_1.eslintRules).map(key => {
        const rule = eslint_1.eslintRules[key];
        config.rules[key] = config.rules[key] || rule;
    });
    // config.rules.quotes = config.rules.quotes || [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }]
}
const addTs = () => {
    utils_1.pushDeps(undefined, `@types/node`, `typescript`);
    utils_1.writeFileSafe(`tsconfig.json`, `{
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
  }`);
};
exports.addTs = addTs;
const addEditorConfig = () => {
    utils_1.writeFileSafe(editorconfigName, editorConfig_1.editorConfigTmpl);
};
exports.addEditorConfig = addEditorConfig;
