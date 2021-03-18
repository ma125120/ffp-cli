import { mkdirSync } from "fs"
import { cssTransform, fileTransform, jestTmpl, setupTmpl } from "../template/jest"
import { pushDeps, writeFileSafe, writePackageJson } from "../utils"

export const addJest = () => {
  pushDeps(undefined, `babel-jest`, `ts-jest`, `jest`, `@types/jest`)
  mkdirSync(`config/jest`, { recursive: true })

  writeFileSafe(`config/jest/cssTransform.js`, cssTransform)
  writeFileSafe(`config/jest/fileTransform.js`, fileTransform)
  writeFileSafe(`jest.config.js`, jestTmpl)
  writeFileSafe(`config/jest/setup.js`, setupTmpl)

  writePackageJson({
    scripts: {
      test: "jest"
    }
  })
}
