import {Controller, Get, Post, Request} from '@nestjs/common'
import {SkipAuth} from '@/modules/auth/skip-auth'
import {UsersService} from '@/modules/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SkipAuth()
  @Get('has-users')
  async login() {
    return this.usersService.hasUsers()
  }
}
