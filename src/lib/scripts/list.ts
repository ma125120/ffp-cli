import chalk from "chalk"
import { choiceList } from "../selects"

export const showList = () => {
  choiceList.map((v, i) => {
    console.log(
      chalk.white(i + '. ' + v.title)
      + `\n`
      + (v.links?.length ? v.links?.map(link => chalk.blue(link)).join(`\n`) + `\n` : '')
    )
  })
}
