import { exec, installDeps, isExist, isYarn, packageJson, writePackageJson } from "../utils"

export const addCommit = () => {
  const devDependencies = [`commitizen`, `cz-conventional-changelog`]
  const dependencies = []

  installDeps(dependencies, devDependencies)

  if (!isExist(packageJson?.config?.commitizen?.path)) {
    exec(`npx commitizen init cz-conventional-changelog ${isYarn ? '--yarn --dev --exact' : '--save-dev --save-exact'}`)
  }
  
  // exec(`npx commitizen init cz-conventional-changelog --yarn --dev --exact`)
  writePackageJson({
    config: {
      "commitizen": {
        "path": "cz-conventional-changelog"
      }
    },
    scripts: {
      commit: "cz",
    }
  })
}