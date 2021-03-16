const getChoice = (title) => ({ title, value: title, })

export enum ChoiceEnum {
  eslint = `eslint`,
  editorConfig = `editorConfig`,
  ts = `ts`,
  commit = `commit`
}

const choiceList = [
  ChoiceEnum.eslint,
  ChoiceEnum.editorConfig,
  ChoiceEnum.ts,
  ChoiceEnum.commit,
].map(v => getChoice(v))

export const selectListOption = {
  type: 'multiselect',
  name: 'value',
  message: '选择需要集成的工具',
  choices: choiceList,
  hint: '- Space 选中. 回车提交'
}
