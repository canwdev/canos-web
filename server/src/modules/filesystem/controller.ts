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

interface ZipResponseFile {
  name: string
  path: string
}

interface ZipResponse extends Response {
  zip: (files: ZipResponseFile[], name?: string, cb?: () => void) => void
}

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
  async downloadEntry(@Query('path') path: string | string[], @Res() response: ZipResponse) {
    try {
      console.log(path)
      if (typeof path === 'string') {
        return response.download(path)
      }
      throw new Error('TBD')
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
