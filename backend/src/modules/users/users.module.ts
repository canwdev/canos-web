import {Module} from '@nestjs/common'
import {UsersService} from './users.service'
import {UsersController} from '@/modules/users/users.controller'
import {User} from '@/modules/users/user.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
