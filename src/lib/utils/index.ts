import { existsSync, readFileSync, createWriteStream } from "fs"
import { resolve } from "path"
import yaml from 'js-yaml'
import { execSync } from "child_process"

export const ROOT = process.cwd()

export const getPath = name => resolve(ROOT, name)

export const isExist = (name: string) => existsSync(name.includes(ROOT) ? name : getPath(name))

export const isYarn = isExist(`yarn.lock`)
export const pack = isExist(`yarn.lock`) ? `yarn add ` : `npm install `

export const loadYml = name => yaml.load(readFileSync(getPath(name), 'utf8'))
export const writeFile = (name: string, obj) => createWriteStream(getPath(name)).write(typeof obj === 'string' ? obj : yaml.safeDump(obj))

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

export const exec = (str) => execSync(str)

export const installDeps = (deps = [], devDeps = []) => {
  deps?.length && exec(`${pack} ${deps.join(` `)}`)
  devDeps?.length && exec(`${pack} ${devDeps.join(` `)} -D`)
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
  
  writeFile(`package.json`, JSON.stringify(json, null, '\t'))
}

