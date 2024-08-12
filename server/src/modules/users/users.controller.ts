import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Request,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import {UsersService} from '@/modules/users/users.service'
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger'
import {CreateEditUserDto} from '@/modules/users/user.dto'
import {RemoveEmptyQueryInterceptor} from '@/utils/params-handle'

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('get-users')
  @ApiOperation({summary: '获取用户列表'})
  @UseInterceptors(RemoveEmptyQueryInterceptor) // 只在此接口生效
  async getUsers(
    @Query('id') id: number,
    @Query('username') username: string,
    @Query('roles') roles: string,
    @Query('disabled') disabled: boolean,
  ) {
    throw new HttpException('demo error', HttpStatus.BAD_REQUEST)
    return this.usersService.findUsers({
      id,
      username,
      roles,
      disabled,
    })
  }

  @Post('create-user')
  @ApiOperation({summary: '创建用户'})
  @ApiBody({type: CreateEditUserDto})
  async createUser(@Body() createUserDto: CreateEditUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Delete('delete-user')
  @ApiOperation({summary: '删除用户'})
  async deleteUser(@Query('id') id: number) {
    try {
      return await this.usersService.deleteUser(id)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Put('update-user')
  @ApiOperation({summary: '更新用户'})
  @ApiBody({type: CreateEditUserDto})
  async updateUser(@Body() editUserDto: CreateEditUserDto) {
    try {
      await this.usersService.updateUser(editUserDto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
