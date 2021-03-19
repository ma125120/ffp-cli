import { getPackageJson } from "../utils"

export const getTravisTmpl = () => {
  const { scripts } = getPackageJson()
  const { test, build, bd, release } = scripts
  const BUILD_NAME = build ? 'build' : bd ? 'bd' : ''

  let pub = BUILD_NAME ? `npm run ${BUILD_NAME}` : ''
  pub = release ? `${pub ? pub + ' && ' : ''} npm run release` : ``

  return `
language: node_js
node_js:
  - 14

env:
  - TEST=${test ? 1 : 0}${BUILD_NAME ? ` BUILD_NAME=${BUILD_NAME}` : ''}

install:
  - npm install

stages:
  - test
  - build
  ${pub ? `- name: publish
    if: branch = master` : ''}

_shared_build: &bd
  script: npm run $BUILD_NAME
  if: env(BUILD_NAME) =~ /^\\w/

jobs:
  include:
    - stage: test
      script: npm run test
      if: TEST = 1
    - stage: build
      <<: *bd
    ${pub ? `- stage: publish
      script: ${pub}
      deploy:
        provider: npm
        api_key: $NPM_API_KEY
        on: master` : ''}`
}
