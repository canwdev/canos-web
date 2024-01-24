import {Body, Controller, Get, Post} from '@nestjs/common'
import {FsService} from './service'

@Controller('/api/filesystem')
export class FsController {
  constructor(private readonly appService: FsService) {}

  @Get()
  getHello() {
    return 'fs ok'
  }

  @Post('list')
  getList(@Body() params: any) {
    const {path: musicPath = '', getPlayStat = false} = params
    return {
      params,
    }
  }
}
