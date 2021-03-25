
import { execSync } from "child_process"

export const exec = (str) => execSync(str, { encoding: 'utf-8' })

const res = exec(`yarn -v`)
console.log(res)
