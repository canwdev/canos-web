import {Body, Controller, Get, Post, Request} from '@nestjs/common'
import {SkipAuth} from '@/modules/auth/skip-auth'
import {UsersService} from '@/modules/users/users.service'
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @SkipAuth()
  @ApiOperation({summary: '判断是否有用户存在'})
  @ApiResponse({status: 200, type: Boolean})
  @Get('has-users')
  async hasUsers() {
    return this.usersService.hasUsers()
  }

  @Get('get-users')
  @ApiOperation({summary: '获取用户列表'})
  async getUsers() {
    return this.usersService.getUsers()
  }

  @Post('create-user')
  @ApiOperation({summary: '创建用户'})
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
