import { pushDeps, writePackageJson } from "../utils"

export const addRelease = () => {
  pushDeps(undefined, `standard-version`)

  writePackageJson({
    "scripts": {
      "release": "standard-version",
      "release:rc": "standard-version --prerelease rc",
      "pup": "npm run release && git push --follow-tags origin master",
      "pub": "npm run pup && npm publish"
    },
    // "standard-version": {
    //   "scripts": {
    //     "posttag": "git push --follow-tags origin master && npm publish"
    //   }
    // }
  })
}