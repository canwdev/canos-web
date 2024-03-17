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

type ShareLinkMap = {
  // 由随机id到paths的影射
  [key: string]: string[]
}

// 存储临时下载分享的key
const shareLinkMap: ShareLinkMap = {}

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

  @Post('media-details')
  getDetails(@Body() params: any) {
    return this.fsService.getMediaDetails(params)
  }

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
  createDirectory(@Body('path') path: string) {
    try {
      fs.mkdirSync(path)
      return {path}
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('path') path: string,
    // @Query('existingStrategy') existingStrategy?: ExistingStrategyType,
  ) {
    try {
      if (fs.existsSync(path)) {
        throw new Error(`file ${path} already exist!`)
      }
      await this.fsService.uploadFile(path, file.buffer)
      return {path}
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

  @Post('delete')
  async deleteEntry(@Body('path') path: string) {
    try {
      await fs.promises.rm(path, {recursive: true})
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
    const key = guid()
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

  // 不需要鉴权的流式传输
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
