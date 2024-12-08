import {Module} from '@nestjs/common'
import {RemoteController} from './remote.controller'
import {RemoteService} from './remote.service'
import {RemoteGateway} from './remote.gateway'
import {UsersModule} from '@/modules/users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [RemoteController],
  providers: [RemoteService, RemoteGateway],
})
export class RemoteModule {}
