import {Controller, Get, Post} from '@nestjs/common'
import {AppService} from './app.service'
import {SkipAuth} from '@/modules/auth/roles.decorator'

@Controller('server')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get()
  getHello() {
    return 'Server Online'
  }

  @Get('server-info')
  getServerInfo() {
    return this.appService.getServerInfo()
  }

  @Post('shutdown')
  shutdown() {
    setTimeout(() => {
      process.exit(0)
    }, 100)
    return 'ok'
  }
}
