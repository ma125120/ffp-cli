const getChoice = (title) => ({ title, value: title, })

export enum ChoiceEnum {
  eslint = `eslint`,
  editorConfig = `editorConfig`,
  ts = `ts`,
  commit = `commit`,
  release = `release`
}

const choiceList = [
  ChoiceEnum.eslint,
  ChoiceEnum.editorConfig,
  ChoiceEnum.ts,
  ChoiceEnum.commit,
  ChoiceEnum.release
].map(v => getChoice(v))

export const selectListOption = {
  type: 'multiselect',
  name: 'value',
  message: '选择需要集成的工具',
  choices: choiceList,
  hint: '- Space 选中. 回车提交'
}
