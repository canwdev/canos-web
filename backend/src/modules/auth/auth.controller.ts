import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LocalAuthGuard} from '@/modules/auth/local-auth.guard'
import {JwtAuthGuard} from '@/modules/auth/jwt-auth.guard'
import {SkipAuth} from '@/modules/auth/roles.decorator'
import {UsersService} from '@/modules/users/users.service'
import {serverLogger} from '@/utils/server-log'
import {ApiTags} from '@nestjs/swagger'
import {Throttle} from '@nestjs/throttler'

@ApiTags('登录鉴权')
@Controller('users/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // 每60秒最多允许5次请求
  @Throttle({default: {limit: 5, ttl: 60000}})
  // 注意！这里使用了Guard，因此数据会先在Guard里处理
  // 此处Guard对应的文件是：local.strategy.ts
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateTokens(req.user)
  }

  // 刷新 Token
  @Throttle({default: {limit: 5, ttl: 60000}})
  @SkipAuth()
  @Post('refresh')
  async refreshTokens(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    serverLogger.trace('[AuthController][getProfile]', req.user)
    return this.usersService.getUserProfile(req.user.sub)
  }
}
