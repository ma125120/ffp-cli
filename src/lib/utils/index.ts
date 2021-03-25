import { existsSync, readFileSync, writeFileSync } from "fs"
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
  writeFileSync(getPath(name), typeof obj === 'string' ? obj : yaml.dump(obj))
} // createWriteStream(getPath(name)).write(typeof obj === 'string' ? obj : yaml.dump(obj))
export const writeFileSafe = (name: string, obj) => {
  if (!isExist(getPath(name))) {
    writeFile(name, obj)
  }
}

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
  } catch (err) {
    console.error(err)
  }

}
export const logFn = async (fn, name) => {
  await logFnBase(fn, `${name}任务开始`, `${name}任务已结束`)
}

export const extendConfig = (config, tmpl) => {
  Object.keys(tmpl).map(key => {
    const item = tmpl[key]
    const isArray = Array.isArray(item)
    if (!isArray) {
      if (typeof item === 'object') {
        if (config[key] === undefined) config[key] = {}
        extendConfig(config[key], item)
      } else {
        config[key] = config[key] ?? item
      }
    } else if (isArray) {
      config[key] = config[key] ?? item
    }
  })
}

export const exec = (str) => {
  console.log(chalk.gray(`\n执行命令： ${str}，请耐心等待...`))
  return new Promise((resolve) => {
    _exec(str, {
      cwd: process.cwd(),
    }, (err, stdout) => {
      if (err) {
        console.error(err)
      } else {
        console.log(chalk.green(`命令 ${str} 执行完成`))
      }
      resolve(stdout)
    })
  })
}

export const installDeps = () => {
  setTimeout(() => {
    dependencies?.length && exec(`${pack} ${dependencies.join(` `)}`)
    devDependencies?.length && exec(`${pack} ${devDependencies.join(` `)} -D`)
  }, 100)
}

export const pushSafe = (list = [], item) => {
  if (!list.includes(item)) {
    list.push(item)
  }
}
export const getPackageJson = () => isExist(getPath(`package.json`)) ? require(getPath(`package.json`)) : {};

export const writePackageJson = (obj) => {
  const json = getPackageJson()
  extendConfig(json, obj)

  writeFile(`package.json`, JSON.stringify(json, null, '  '))
}

export const deps = {
  ...(getPackageJson().devDependencies || {}),
  ...(getPackageJson().dependencies || {})
}

export const dependencies = []
export const devDependencies = []

export const pushDeps = (type = 'dev', ...list) => {
  const _list = type === 'dev' ? devDependencies : dependencies

  list.map(v => {
    if (!deps[v]) {
      _list.push(v)
      // deps.push(v)
    }
  })
}
