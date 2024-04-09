import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LocalAuthGuard} from '@/modules/auth/local-auth.guard'
import {JwtAuthGuard} from '@/modules/auth/jwt-auth.guard'
import {SkipAuth} from '@/modules/auth/skip-auth'

@Controller('users/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 注意！这里使用了Guard，因此数据会先在Guard里处理
  // 此处Guard对应的文件是：local.strategy.ts
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
