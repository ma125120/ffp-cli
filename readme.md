# ffp-cli
全称front-full-project cli

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ma125120/ffp-cli?style=social"><a href="https://github.com/ma125120/ffp-cli">
  <img src="https://www.travis-ci.com/ma125120/ffp-cli.svg?branch=main&status=passed" alt="build:passed">
</a> <img alt="npm" src="https://img.shields.io/npm/v/ffp-cli" /> <img alt="NPM" src="https://img.shields.io/npm/l/ffp-cli" /> <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/ma125120/ffp-cli"> <img alt="npm" src="https://img.shields.io/npm/dw/ffp-cli">


提供一套完整的前端项目 脚手架 支持，通过选择对应配置直接集成，免去安装依赖再配置的麻烦。
## 安装
```cmd
npm i -g ffp-cli
```

## 使用
### 1. 选择工具，可用 -D 参数声明，或在命令行中进行多选
```js
ffp // 如不提供参数，默认会进行多选

// 或者
ffp -D jest eslint ts editorConfig commit release travis
// -D 参数支持数组，如提供了-D 参数，则不会进行选择

```
### 2. 添加全部工具
```js
ffp -a
```

### 3. 显示支持的工具列表
```js
ffp -l
```

## 工具介绍
### 1. eslint 代码校验

安装 eslint 相关依赖，并添加 eslint 配置文件，若本地不存在，则直接覆盖；若已存在，则会进行字段合并

文档地址： [https://eslint.org/docs/user-guide/configuring/](https://eslint.org/docs/user-guide/configuring/)
### 2. editorConfig 编辑器格式化
（仅为推荐配置，自动格式化需自行配置）

生成 .editorconfig 文件。与 eslint 配合时，还会将本模板的 ***eslint rules 合并至 eslint配置文件***。

### 3. ts

安装 typescript 依赖，生成tsconfig.json。

### 4. commit 规范代码提交格式
安装 ``` `commitizen`, `@commitlint/config-conventional`, `@commitlint/cli`, `husky`, `lint-staged` ``` 等依赖，并在package.json 添加 ``` "cz": "cz" ``` 的脚本，提交代码时可通过 ```npm run cz``` 代替 ```git commit``` 。

添加了 pre-commit 进行 ```eslint --fix```， commit-msg 进行 ``` commitlint ```

commitlint 文档地址：[https://github.com/conventional-changelog/commitlint](https://github.com/conventional-changelog/commitlint)

husky 文档地址：[https://typicode.github.io/husky/#/?id=automatic-recommended](https://typicode.github.io/husky/#/?id=automatic-recommended)

lint-staged文档地址：[https://github.com/okonet/lint-staged#example-ignore-files-from-match](https://github.com/okonet/lint-staged#example-ignore-files-from-match)

### 5. release 规范自动化发布

安装 standard-version 依赖。
并添加以下对象至 package.json（如已存在，并不会覆盖）
```js
{
  scripts: {
    "release": "standard-version", // 本地发布，修改版本号，根据commit 生成 changelog.md，不提交代码
    "release:rc": "standard-version --prerelease rc", // 预发布
    "pup": "npm run release && git push --follow-tags origin master", // 本地发布并提交到远程
    "pub": "npm run pup && npm publish" // 本地发布并提交到远程，然后发布到npm
  }
}
```
文档地址：[https://github.com/conventional-changelog/standard-version](https://github.com/conventional-changelog/standard-version)
### 6. jest 单元测试

安装 ```jest``` 等相关依赖，并生成 ```jest.config.js```相关配置文件。

文档地址：[https://jestjs.io/zh-Hans/docs/getting-started](https://jestjs.io/zh-Hans/docs/getting-started)
### 7. travis 自动化CI/CD

生成 ```.travis.yml``` 文件，相关配置如不满足需要，可自行修改。

文档地址：[https://docs.travis-ci.com/user/tutorial/](https://docs.travis-ci.com/user/tutorial/)
