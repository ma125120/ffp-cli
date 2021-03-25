"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintRules = exports.eslintConfigTmpl = void 0;
exports.eslintConfigTmpl = {
    // parser: '@typescript-eslint/parser',
    // plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    // extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    globals: {
        module: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
    // 'prettier/prettier': 1,
    },
};
exports.eslintRules = {
    /** 不允许多行空白 */
    "no-multiple-empty-lines": ["error", { max: 1 }],
    /** 尾逗号 */
    "comma-dangle": ["error", "only-multiline"],
    /** 函数参数 */
    "function-paren-newline": ["error", "multiline-arguments"],
    /** 禁止属性前有空白 */
    "no-whitespace-before-property": ["error"],
    /** 要求操作符周围有空格 */
    "space-infix-ops": ["error"],
    /** 强制在一元操作符前后使用一致的空格 */
    "space-unary-ops": ["error"],
    /** 强制剩余和扩展运算符及其表达式之间有空格 */
    "rest-spread-spacing": ["error", "never"],
    /** 强制将对象的属性放在不同的行上 */
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
    /** 禁止多个空格 */
    "no-multi-spaces": ["error"],
    /** 强制关键字周围空格的一致性 */
    "keyword-spacing": ["error"],
    /** 强制在花括号中使用一致的空格 */
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    /** 强制在块之前使用一致的空格 */
    "space-before-blocks": "error",
    /** 强制在逗号周围使用空格 */
    "comma-spacing": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-irregular-whitespace": 0,
};
