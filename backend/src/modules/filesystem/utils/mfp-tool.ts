import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'
import {getSafePath} from './filesystem-utils'

// music_folder_player.properties parser tool

/*
Example:
#This file was created by Music Folder Player.
#Mon Nov 09 03:46:43 GMT+08:00 2020
position=25796
filesize=15126207
file=145. Caspian - Loft.mp3
time=1604864803658
 */

type DataObj = {
  position: number
  filesize: number
  file: string
  time?: number
}

const filename = '.music_folder_player.properties'
const generateComment = (date: Date = new Date()): string =>
  `#This file was created by Music Folder Player.\n#${date.toString()}\n`

const parseFile = async (filePath: string): Promise<{[key: string]: string} | null> => {
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  const result: {[key: string]: string} = {}
  for await (const line of rl) {
    if (/^#/.test(line)) {
      continue
    }
    const [key, value] = line.split(/=(.+)/)
    result[key] = value
  }
  return result
}

const parseFromFolder = (folderPath: string): Promise<{[key: string]: string} | null> =>
  parseFile(path.join(folderPath, getSafePath(filename)))

const stringify = (obj: DataObj): string => {
  const date = new Date()
  obj.time = obj.time || date.getTime()
  let str = generateComment(date)
  for (const key in obj) {
    str += `${key}=${obj[key]}\n`
  }
  return str
}

const writeFile = (filePath: string, obj: DataObj): void => {
  const str = stringify(obj)
  fs.writeFileSync(filePath, str, {encoding: 'utf8'})
}

const writeToFolder = (folderPath: string, obj: DataObj): void =>
  writeFile(path.join(folderPath, getSafePath(filename)), obj)

export const mfpTool = {
  filename,
  parseFile,
  parseFromFolder,
  stringify,
  writeFile,
  writeToFolder,
}
