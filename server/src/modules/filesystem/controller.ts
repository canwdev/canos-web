import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import {Response} from 'express'
import {FsService} from './service'
import * as fs from 'fs-extra'
import {FileInterceptor} from '@nestjs/platform-express'
import {SkipAuth} from '@/modules/auth/skip-auth'
import {guid} from '@/utils'
import {diskStorage} from 'multer'
import * as Path from 'path'

type ShareLinkMap = {
  // 由随机id到paths的影射
  [key: string]: string[]
}

// 存储临时下载分享的key
const shareLinkMap: ShareLinkMap = {}
// 缓存文件数组列表到guid
const pathCacheMap = new Map<string, string>()

@Controller('filesystem')
export class FsController {
  constructor(private readonly fsService: FsService) {}

  @Get()
  getHello() {
    return 'fs ok'
  }

  @Post('list')
  getList(@Body() params: any) {
    return this.fsService.getList(params)
  }

  // @Post('media-details')
  // getDetails(@Body() params: any) {
  //   return this.fsService.getMediaDetails(params)
  // }

  // @Post('fs-api')
  // fsApi(@Body() params: any) {
  //   return this.fsService.fsApi(params)
  // }

  @Post('drives')
  getDrives() {
    return this.fsService.getDrives()
  }

  @Get('stream')
  getPathStreamUrl(@Query('path') path: string, @Res() response: Response) {
    response.sendFile(path)
  }

  @Post('create-dir')
  createDirectory(
    @Body('path') path: string,
    @Body('ignoreExisted') ignoreExisted: boolean = false,
  ) {
    try {
      if (ignoreExisted) {
        if (fs.existsSync(path)) {
          return {path}
        }
      }
      fs.mkdirSync(path)
      return {path}
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('upload-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dest = Path.dirname(req.query.path as string)
          console.log(dest)
          cb(null, dest || './uploads/')
        },
        filename: (req, file, cb) => {
          file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
          console.log('file', file)
          cb(null, file.originalname)
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Query('path') path: string) {
    try {
      return {path: path}
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('rename')
  renameEntry(@Body('fromPath') fromPath: string, @Body('toPath') toPath: string) {
    try {
      fs.renameSync(fromPath, toPath)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('copy-paste')
  async copyPaste(
    @Body('fromPaths') fromPaths: string,
    @Body('toPath') toPath: string,
    @Body('isMove') isMove: boolean = false,
  ) {
    for (let i = 0; i < fromPaths.length; i++) {
      const path = fromPaths[i]
      await this.fsService.copyEntry(path, toPath, isMove)
    }
    return {toPath}
  }

  @Post('delete')
  async deleteEntry(@Body('path') path: string | string[]) {
    try {
      if (Array.isArray(path)) {
        for (let i = 0; i < path.length; i++) {
          const p = path[i]
          await fs.promises.rm(p, {recursive: true})
        }
      } else {
        await fs.promises.rm(path, {recursive: true})
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('download')
  async downloadEntry(@Query('paths') paths: string[], @Res() response: Response) {
    return this.fsService.downloadFiles(paths, response)
  }

  // 由于下载需要鉴权，所以创建公开分享链接
  @Post('create-share-link')
  async createShareLink(@Body('paths') paths: string[]) {
    let key
    // 缓存
    const pathStr = paths.join(',')
    const k = pathCacheMap.get(pathStr)
    if (k) {
      // console.log('命中缓存', pathStr, k)
      key = k
    } else {
      key = guid()
      pathCacheMap.set(pathStr, key)
      // console.log('添加缓存', pathStr, key)
    }
    shareLinkMap[key] = paths
    return {key}
  }

  // 不需要鉴权的下载
  @Get('download-share')
  @SkipAuth()
  async downloadShare(@Query('key') key: string, @Res() response: Response) {
    try {
      if (!shareLinkMap[key]) {
        throw new Error('[downloadShare] share key is invalid')
      }
      return this.fsService.downloadFiles(shareLinkMap[key], response)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  // 不需要鉴权的流式传输，仅支持单文件
  @Get('stream-share')
  @SkipAuth()
  streamShare(@Query('key') key: string, @Res() response: Response) {
    try {
      if (!shareLinkMap[key]) {
        throw new Error('[streamShare] share key is invalid')
      }
      return response.sendFile(shareLinkMap[key][0])
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
