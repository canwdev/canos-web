import {Body, Controller, Post} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {RemoteService} from '@/modules/remote/remote.service'

@ApiTags('远程控制')
@Controller('remote')
export class RemoteController {
  constructor(private readonly remoteService: RemoteService) {}

  @Post('connect')
  async connectSSH(@Body() config: any) {
    try {
      const connection = await this.remoteService.connectSSH(config)
      return {success: true, connection}
    } catch (error) {
      return {success: false, error: error.message}
    }
  }

  @Post('execute')
  async executeCommand(@Body() data: {command: string}) {
    try {
      const result = await this.remoteService.executeCommand(data.command)
      return {success: true, result}
    } catch (error) {
      return {success: false, error: error.message}
    }
  }
}
