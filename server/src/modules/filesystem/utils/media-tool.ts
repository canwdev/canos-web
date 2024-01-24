import mm, {IAudioMetadata} from 'music-metadata'
import {getLyricsPath, getSafePath, calcBufferHash, getImagePath} from './filesystem-utils'
import * as mime from 'mime-types'
import path from 'path'
import * as fs from 'fs'

/**
 * Get music metadata and extract cover
 * @param absPath absolute file path
 * @returns {Promise<{coverFileName: string, metadata: IAudioMetadata}>}
 */
export const getMetadata = async (
  absPath: string,
): Promise<{coverFileName?: string; metadata: IAudioMetadata}> => {
  const metadata = await mm.parseFile(absPath)
  const {common} = metadata
  delete metadata.quality

  let coverFileName
  // Extract cover
  if (common.picture && common.picture[0]) {
    const picture = common.picture[0]
    const coverBuffer = picture.data
    const coverHash = await calcBufferHash(coverBuffer)
    coverFileName = `${coverHash}.${mime.extension(picture.format)}`
    const coverSavePath = getImagePath(coverFileName)
    if (!fs.existsSync(coverSavePath)) {
      fs.writeFileSync(coverSavePath, coverBuffer, 'binary')
    }

    delete common.picture
    delete common.comment

    coverFileName
  } else {
    // try to use same dir cover.jpg
  }

  return {
    metadata,
    coverFileName,
  }
}

export const filterLyricFilename = (
  filename: string,
  options: {isExact?: boolean} = {},
): string => {
  const {isExact} = options
  // Remove suffix
  filename = filename.slice(0, filename.lastIndexOf('.'))

  if (!isExact) {
    // "05. Eagles - 加州旅馆" => "Eagles - 加州旅馆"
    filename = filename.replace(/^[\d]{1,8}.\s/, '')
  }
  return filename
}

/**
 * 遍历歌词数组获取歌词文件名
 * @param lyricFileList List contains lyric filenames
 * @param filename Music filename
 * @param options
 */
export const traverseLyrics = (lyricFileList: string[], filename: string): string | undefined => {
  console.log('>>> [traverseLyrics]', filename)

  for (let i = 0; i < lyricFileList.length; i++) {
    const lyric = lyricFileList[i]
    // 此处文件可能有特殊字符，不能用正则表达式
    const mLyric = lyric.slice(0, lyric.lastIndexOf('.'))
    if (filename === mLyric) {
      console.log('<<< [traverseLyrics] OK', lyric)
      return lyric
    }
  }
  console.log('<<< [traverseLyrics] not found')
}

export const saveLyricFile = async (
  filename: string,
  lyric: string,
  options: {isExact?: boolean} = {},
): Promise<{savePath: string; filename: string}> => {
  filename = filterLyricFilename(filename, options) + '.lrc'

  const savePath = getLyricsPath(filename)
  fs.writeFileSync(savePath, lyric, {encoding: 'utf8'})
  // TODO: nodeBus.emit(BUS_UPDATE_LYRIC_CACHE, savePath)
  return {
    savePath,
    filename,
  }
}
