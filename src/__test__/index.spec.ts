import { extendConfig } from '../lib/utils'

const tmpl = {
  rules: {
    eslint: false,
    ts: true,
  },
  parser: "ts",
  extends: ["rand"]
}

describe(`测试extendConfig`, () => {
  it(`extendConfig，不合并数组`, () => {
    const config = {
      rules: {
        "eslint": true,
      }
    }

    const dest = {
      ...tmpl,
      rules: {
        eslint: true,
        ts: true,
      },
    }
    extendConfig(config, tmpl)
    expect(config).toStrictEqual(dest)
  })

  it(`extendConfig， 对应的Key不存在时可直接替换`, () => {
    const config = {}

    const dest = { ...tmpl }
    extendConfig(config, tmpl)
    expect(config).toStrictEqual(dest)
  })
})
