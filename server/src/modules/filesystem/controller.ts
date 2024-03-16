import {Body, Controller, Get, Post} from '@nestjs/common'
import {FsService} from './service'

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

  @Post('fs-api')
  fsApi(@Body() params: any) {
    return this.fsService.fsApi(params)
  }
}
