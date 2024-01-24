import * as fs from 'fs-extra'
import * as Path from 'path'
import {IMAGE_PATH, MUSIC_LIBRARY_PATH, MUSIC_LYRICS_PATH} from './enum'
import * as crypto from 'crypto'

// Check if path is absolute
export function isAbsolutePath(path) {
  return /^(?:\/|[a-zA-Z]:\\)/.test(path)
}

export const getSafePath = (p) => {
  return Path.normalize(p).replace(/^(\.\.(\/|\\|$))+/, '')
}

// TODO: 重命名或废弃
export const getMediaPath = (subPath = '') => {
  // 媒体库必须是绝对路径
  return Path.join(MUSIC_LIBRARY_PATH, getSafePath(subPath))
}

// TODO: 重命名或废弃
export const getImagePath = (subPath = '') => {
  return Path.join(IMAGE_PATH, getSafePath(subPath))
}

// TODO: 重命名或废弃
export const getLyricsPath = (subPath = '') => {
  return Path.join(MUSIC_LYRICS_PATH, getSafePath(subPath))
}

export const getExactPath = (path, filename) => {
  if (!filename) {
    throw new Error('getExactPath: Filename can not be empty')
  }

  const currentMusicDir = getMediaPath(path)
  const filePath = Path.join(currentMusicDir, getSafePath(filename))

  if (!fs.existsSync(filePath)) {
    throw new Error('File not exist')
  }

  return {
    filePath,
    currentMusicDir,
  }
}

export function calcBufferHash(buffer, algorithm = 'sha1') {
  return new Promise((resolve, reject) => {
    const sum = crypto.createHash(algorithm)
    try {
      sum.update(buffer)
      const hash = sum.digest('hex')
      return resolve(hash)
    } catch (error) {
      return reject(error)
    }
  })
}
