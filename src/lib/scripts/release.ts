import { exec, isExist, isYarn, packageJson, pushDeps, writePackageJson } from "../utils"

export const addRelease = () => {
  pushDeps(undefined, `standard-version`)

  writePackageJson({
    "scripts": {
      "release": "standard-version"
    }
  })
}