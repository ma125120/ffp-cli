import { existsSync, readFileSync, createWriteStream, writeFileSync } from "fs"
import { resolve } from "path"
import yaml from 'js-yaml'
import { exec as _exec } from "child_process"
import chalk from 'chalk'

export const ROOT = process.cwd()

export const getPath = name => resolve(ROOT, name)

export const isExist = (name: string) => existsSync(name.includes(ROOT) ? name : getPath(name))

export const isExistTs = () => isExist('tsconfig.json')

export const isYarn = isExist(`yarn.lock`)
export const pack = isExist(`yarn.lock`) ? `yarn add ` : `npm install `

export const loadYml = name => yaml.load(readFileSync(getPath(name), 'utf8'))
export const writeFile = (name: string, obj) => {
  writeFileSync(getPath(name), typeof obj === 'string' ? obj : yaml.safeDump(obj))
} // createWriteStream(getPath(name)).write(typeof obj === 'string' ? obj : yaml.safeDump(obj))

export const logFnBase = async (fn, prefix, suffix) => {
  try {
    if (prefix) {
      console.log(chalk.white(prefix))
    }
    await fn();
    if (suffix) {
      console.log(chalk.green(suffix))
      chalk.green(suffix)
    }
  } catch(err) {
    console.error(err)
  }
  
}
export const logFn = async (fn, name) => {
  await logFnBase(fn, `${name}任务开始`, `${name}任务已结束`) 
}

export const extendConfig = (config, tmpl) => {
  Object.keys(tmpl).map(key => {
    const item = tmpl[key]

    if (item && !Array.isArray(item) && config[key] === undefined) {
      if (typeof item === 'object') {
        extendConfig(config[key], item)
      } else {
        config[key] = item
      }
    }
  })
}

export const exec = (str) => {
  console.log(chalk.gray(`执行命令： ${str}`))
  const res = _exec(str, {
    cwd: process.cwd(),
  }, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      console.log(chalk.green(`命令 ${str} 执行完成`))
    }
  })
}

export const installDeps = () => {
  setTimeout(() => {
    console.log(chalk.white(`开始安装依赖，请耐心等待`))
    dependencies?.length && exec(`${pack} ${dependencies.join(` `)}`)
    devDependencies?.length && exec(`${pack} ${devDependencies.join(` `)} -D`)
  }, 100)
}

export const pushSafe = (list = [], item) => {
  if (!list.includes(item)) {
    list.push(item)
  }
}
export const packageJson = require(getPath(`package.json`))

export const writePackageJson = (obj,) => {
  const json = require(getPath(`package.json`))
  Object.keys(obj).map(key => {
    if (typeof obj[key] === 'object') {
      extendConfig(json[key], obj[key])
    } else {
      json[key] = json[key] || obj[key]
    }
  })
  
  writeFile(`package.json`, JSON.stringify(json, null, '  '))
}

const deps = {
  ...(packageJson.devDependencies || {}),
  ...(packageJson.dependencies || {})
}

export const dependencies = []
export const devDependencies = []

export const pushDeps = (type = 'dev', ...list) => {
  const _list = type === 'dev' ? devDependencies : dependencies

  list.map(v => {
    if (!deps[v]) {
      _list.push(v)
      deps.push(v)
    }
  })
}