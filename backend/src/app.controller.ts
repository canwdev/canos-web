import {Controller, Get, Post} from '@nestjs/common'
import {AppService} from './app.service'
import {SkipAuth} from '@/modules/auth/roles.decorator'
import {serverInfo} from '@/enum'
import {ServerInfo} from '@/types/server'

@Controller('server')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get()
  getHello(): Partial<ServerInfo> {
    return {
      name: serverInfo.name,
      version: serverInfo.version,
      hostUrls: serverInfo.hostUrls,
    }
  }

  @Get('server-info')
  getServerInfo() {
    return serverInfo
  }

  @Post('shutdown')
  shutdown() {
    setTimeout(() => {
      process.exit(0)
    }, 100)
    return {message: 'shutdown command will be executed'}
  }
}
