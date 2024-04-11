import {Body, Controller, Get, Post, Request} from '@nestjs/common'
import {SkipAuth} from '@/modules/auth/skip-auth'
import {UsersService} from '@/modules/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SkipAuth()
  @Get('has-users')
  async hasUsers() {
    return this.usersService.hasUsers()
  }

  @Get('get-users')
  async getUsers() {
    return this.usersService.getUsers()
  }

  @Post('create-user')
  async createUser(@Body('username') username, @Body('password') password) {
    return this.usersService.createUser({username, password})
  }

  @Post('delete-user')
  async deleteUser(@Body('id') id) {
    return this.usersService.deleteUser(id)
  }

  @Post('update-user')
  async updateUser(@Body('id') id, @Body('username') username) {
    return this.usersService.updateUser(id, username)
  }

  @Post('update-password')
  async updatePassword(
    @Body('username') username,
    @Body('oldPassword') oldPassword,
    @Body('password') password,
  ) {
    return this.usersService.updatePassword(username, oldPassword, password)
  }
}
