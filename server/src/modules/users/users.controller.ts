import {Body, Controller, Get, Post, Request} from '@nestjs/common'
import {UsersService} from '@/modules/users/users.service'
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger'
import {CreateEditUserDto, UserIdDto} from '@/modules/users/user.dto'

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('get-users')
  @ApiOperation({summary: '获取用户列表'})
  async getUsers() {
    return this.usersService.findUsers()
  }

  @Post('create-user')
  @ApiOperation({summary: '创建用户'})
  @ApiBody({type: CreateEditUserDto})
  async createUser(@Body() createUserDto: CreateEditUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Post('delete-user')
  @ApiOperation({summary: '删除用户'})
  @ApiBody({type: UserIdDto})
  async deleteUser(@Body() dto: UserIdDto) {
    return this.usersService.deleteUser(dto.id)
  }

  @Post('update-user')
  @ApiOperation({summary: '更新用户'})
  @ApiBody({type: CreateEditUserDto})
  async updateUser(@Body() editUserDto: CreateEditUserDto) {
    return this.usersService.updateUser(editUserDto)
  }
}
