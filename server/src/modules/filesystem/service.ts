import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {getExactPath, getMediaPath} from './utils/filesystem-utils'
import * as fs from 'fs-extra'
import * as Path from 'path'
import {mfpTool} from './utils/mfp-tool'
import {getMetadata} from './utils/media-tool'
import {serverInfo} from '@/enum'
import {IDrive, IEntry} from '@/types/server'
import * as nodeDiskInfo from 'node-disk-info'
import {Response} from 'express'
import * as moment from 'moment/moment'
import * as Archiver from 'archiver'

interface ZipResponseFile {
  name: string
  path: string
}

export interface ZipResponse extends Response {
  zip: (files: ZipResponseFile[], name?: string, cb?: () => void) => void
}

@Injectable()
export class FsService {
  async getMediaList(params) {
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
        const stat = fs.statSync(Path.join(dir, name))
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
    if (fs.existsSync(Path.join(dir, mfpTool.filename))) {
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

  async getDrives(): Promise<IDrive[]> {
    let dirs: IDrive[] = [
      {
        label: 'Home',
        path: serverInfo.homeDir,
      },
    ]
    if (serverInfo.platform === 'win32') {
      const driveList = nodeDiskInfo.getDiskInfoSync()

      dirs = [
        ...dirs,
        ...driveList.map((drive) => {
          return {
            label: drive.mounted,
            path: drive.mounted,
            free: drive.available,
            total: drive.blocks,
          }
        }),
      ]
    } else {
      dirs = [
        ...dirs,
        {
          label: '/',
          path: '/',
        },
      ]
      console.warn(`platform ${serverInfo.platform} needs to be implemented`)
    }
    return dirs
  }

  async getList(params): Promise<IEntry[]> {
    try {
      const {path} = params
      if (!fs.existsSync(path)) {
        throw new HttpException('Path not exist', HttpStatus.NOT_FOUND)
      }
      const files = await fs.readdir(path)
      return files.map((entryName: string) => {
        const entryPath = Path.join(path, entryName)
        let stat: any = null
        let error

        try {
          stat = fs.statSync(entryPath)
        } catch (e) {
          error = e.message
        }

        const isDirectory = stat && stat.isDirectory()
        return {
          name: entryName,
          isDirectory,
          hidden: entryName.startsWith('.'),
          lastModified: stat?.ctimeMs || 0,
          size: isDirectory ? undefined : stat?.size,
          error,
        }
      })
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  uploadFile(path: string, buffer: Buffer) {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(path)

      stream.on('open', () => {
        const chunkSize = 128
        const bufferLength = buffer.length
        const count = Math.ceil(bufferLength / chunkSize)
        for (let i = 0; i < count; i++) {
          const chunk = buffer.slice(chunkSize * i, Math.min(chunkSize * (i + 1), bufferLength))
          stream.write(chunk)
        }
        stream.end()
      })
      stream.on('error', (error) => reject(error))
      stream.on('finish', () => resolve(true))
    })
  }

  downloadFiles(paths: string[], response: Response) {
    try {
      if (!paths.length) {
        throw new Error('No file to download')
      }
      if (paths.length === 1) {
        const path = paths[0]
        if (!fs.existsSync(path)) {
          throw new Error(`Path ${path} not exist!`)
        }
        const stat = fs.statSync(path)
        if (!stat.isDirectory()) {
          return response.download(path, Path.basename(path), {
            // 允许隐藏文件，否则隐藏文件会下载失败
            dotfiles: 'allow',
          })
        }
      }
      const downloadName = `archive_${moment(new Date()).format('YYYYMMDD_HHmmss')}.zip`

      const archive = Archiver('zip', {
        zlib: {level: 9},
      })
      paths.forEach((path) => {
        if (!fs.existsSync(path)) {
          throw new Error(`[getRecursiveFlatPaths] Path ${path} not exist!`)
        }
        const stat = fs.statSync(path)
        if (!stat.isDirectory()) {
          // console.log('add file', path)
          archive.file(path, {name: Path.basename(path)})
        } else {
          // console.log('add dir', path)
          const children = fs.readdirSync(path)
          if (children.length) {
            archive.directory(path, Path.basename(path))
          } else {
            // 空文件夹
            archive.append(null, {name: Path.basename(path) + '/'})
          }
        }
      })
      response.header(
        'Content-Disposition',
        `attachment; filename="${encodeURIComponent(downloadName)}.zip"`,
      )
      archive.pipe(response)
      archive.finalize()
    } catch (e) {
      console.log(e)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
