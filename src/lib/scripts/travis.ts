
import { getTravisTmpl } from "../template/travis"
import { writeFileSafe } from "../utils"

export const addTravis = () => {
  writeFileSafe(`.travis.yml`, getTravisTmpl())
}
