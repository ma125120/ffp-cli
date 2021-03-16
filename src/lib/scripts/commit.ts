import { exec, isExist, isYarn, packageJson, pushDeps, writePackageJson } from "../utils"

export const addCommit = () => {
  pushDeps(undefined, `commitizen`,)

  // const pathName = packageJson?.config?.commitizen?.path
  // if (!pathName || !isExist(pathName)) {
  //   exec(`npx commitizen init cz-conventional-changelog ${isYarn ? '--yarn --dev --exact' : '--save-dev --save-exact'}`)
  // }

  // exec(`npx commitizen init cz-conventional-changelog --yarn --dev --exact`)
  writePackageJson({
    // config: {
    //   "commitizen": {
    //     "path": "cz-conventional-changelog"
    //   }
    // },
    scripts: {
      cz: "cz",
    }
  })
  
}