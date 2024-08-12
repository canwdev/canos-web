import {Controller, Get, Post} from '@nestjs/common'
import {AppService} from './app.service'
import {SkipAuth} from '@/modules/auth/roles.decorator'

@Controller('server')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get()
  getHello() {
    return this.appService.getHello()
  }

  @Post('shutdown')
  shutdown() {
    setTimeout(() => {
      process.exit(0)
    }, 100)
    return 'ok'
  }
}
