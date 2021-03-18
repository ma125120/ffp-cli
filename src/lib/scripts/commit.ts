import chalk from "chalk"
import { exec, isExist, pushDeps, writePackageJson } from "../utils"

export const addCommit = async () => {
  pushDeps(undefined, `commitizen`, `@commitlint/config-conventional`, `@commitlint/cli`, `husky`, `lint-staged`)

  await exec(`npx husky init`)
  if (isExist(`.husky/commit-msg`)) {
    console.log(chalk.bgGrey(`有关 commit-msg 已存在，如有必要请需自行修改`))
  } else {
    exec(`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`)
  }

  if (isExist(`.husky/pre-commit`)) {
    console.log(chalk.bgGrey(`有关 pre-commit 已存在，如有必要请需自行修改`))
  } else {
    exec(`npx husky add .husky/pre-commit "npx --no-install lint-staged"`)
  }

  writePackageJson({
    "lint-staged": {
      "*.[jt]sx?": "eslint --fix"
    },
    scripts: {
      cz: "cz",
    },
    commitlint: {
      extends: ['@commitlint/config-conventional']
    }
  })

}
