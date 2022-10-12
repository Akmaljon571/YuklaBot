import fs from "fs"
import path from "path"

export const read = dir => JSON.parse(fs.readFileSync(path.normalize(`${process.cwd()}/src/model/${dir}.json`)))
export const write = (dir, data) => {
    fs.writeFileSync(path.normalize(`${process.cwd()}/src/model/${dir}.json`), JSON.stringify(data, null, 4))
}