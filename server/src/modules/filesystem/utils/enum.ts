import * as process from 'process'
import * as path from 'path'
import {isAbsolutePath} from './filesystem-utils'
import * as fs from 'fs-extra'

// 自动获取绝对路径
const autoGetAbsolutePath = (options) => {
  const {
    // 传入路径
    myPath,
    // 相对基础路径（默认为项目运行目录）
    basePath = process.cwd(),
    // 回退默认路径
    fallbackPath,
  } = options
  if (!myPath) {
    return path.join(basePath, fallbackPath)
  }
  if (!isAbsolutePath(myPath)) {
    return path.join(basePath, myPath)
  }
  return myPath
}

// 媒体库根目录（支持相对路径: process.cwd()）
export const MUSIC_LIBRARY_PATH = autoGetAbsolutePath({
  myPath: process.env.MUSIC_LIBRARY_PATH,
  fallbackPath: 'data',
})

// 音乐歌词存放目录（支持相对路径: MUSIC_LIBRARY_PATH）
export const MUSIC_LYRICS_PATH = autoGetAbsolutePath({
  myPath: process.env.MUSIC_LYRICS_PATH,
  basePath: MUSIC_LIBRARY_PATH,
  fallbackPath: `.lyrics`,
})

// 音乐图片存放目录（缓存）（支持相对路径: MUSIC_LIBRARY_PATH）
export const IMAGE_PATH = autoGetAbsolutePath({
  myPath: process.env.IMAGE_PATH,
  basePath: MUSIC_LIBRARY_PATH,
  fallbackPath: `.images`,
})

fs.ensureDirSync(MUSIC_LIBRARY_PATH)
fs.ensureDirSync(MUSIC_LYRICS_PATH)
fs.ensureDirSync(IMAGE_PATH)
