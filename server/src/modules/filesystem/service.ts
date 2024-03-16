import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {getExactPath, getMediaPath} from './utils/filesystem-utils'
import * as fs from 'fs-extra'
import * as path from 'path'
import {mfpTool} from './utils/mfp-tool'
import {getMetadata} from './utils/media-tool'

@Injectable()
export class FsService {
  async getList(params) {
    const {path: musicPath = '', showHiddenFiles = false} = params

    const dir = getMediaPath(musicPath)

    if (!fs.existsSync(dir)) {
      throw new HttpException('Dir not found', HttpStatus.NOT_FOUND)
    }
    let files = fs.readdirSync(dir)

    const _folders = []
    const _files = []
    if (!showHiddenFiles) {
      files = files.filter((name) => {
        return !/\.db$/.test(name) && !/^\./.test(name) && name !== '@eaDir'
      })
    }
    // TODO: 设定类型
    files.forEach((name, index) => {
      try {
        const stat = fs.statSync(path.join(dir, name))
        const isDirectory = stat.isDirectory()
        const f = {
          id: index,
          filename: name,
          isDirectory,
          path: musicPath,
          size: stat.size,
          birthtime: stat.birthtime,
          ctime: stat.ctime,
          mtime: stat.mtime,
        }
        if (isDirectory) {
          _folders.push(f)
        } else {
          _files.push(f)
        }
      } catch (e) {
        console.log('fs stat error', e)
      }
    })
    const list = [..._folders, ..._files]

    let playStat
    if (fs.existsSync(path.join(dir, mfpTool.filename))) {
      playStat = await mfpTool.parseFromFolder(dir)
    }

    return {
      list,
      dir,
      files,
      playStat,
    }
  }

  async getMediaDetails(params) {
    const {
      path: musicPath = '',
      filename,
      // 是否更新文件夹播放状态
      updatePlayStat = false,
      // 只更新状态，不获取元数据信息
      updateStatOnly = false,
    } = params

    let filePath, currentMusicDir
    try {
      const res = getExactPath(musicPath, filename)
      filePath = res.filePath
      currentMusicDir = res.currentMusicDir
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN)
    }

    // update play status
    if (updatePlayStat) {
      try {
        const stat = fs.statSync(filePath)
        mfpTool.writeToFolder(currentMusicDir, {
          position: 0,
          filesize: stat.size,
          file: filename,
        })
      } catch (e) {
        throw new HttpException('MFP tool error: ' + e.message, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      if (updateStatOnly) {
        return 'updateStatOnly'
      }
    }

    const {metadata, coverFileName} = await getMetadata(filePath)
    delete metadata.native

    // TODO: 获取歌词
    // let lyricText

    const sendData = {
      filePath,
      metadata: metadata,
      cover: undefined,
      // lyric: lyricText,
    }

    if (coverFileName) {
      sendData.cover = `/images/${coverFileName}`
    }
    return sendData
  }

  async fsApi(params) {
    const {method = '', args = []} = params
    const result = await fs[method](...args)
    return result
  }
}
