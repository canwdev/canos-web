import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import {IUserInfo, UserRole} from '@/types/user'
import {serverLogger} from '@/utils/server-log'
import {APP_JWT_SECRET, APP_JWT_REFRESH_SECRET} from '@/enum'
import {myApiEncrypt} from '@/utils/my-crypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    serverLogger.log('[AuthService][validateUser]', username)
    const user = await this.usersService.findUser({username})

    if (!user) {
      return null
    }

    // bcrypt.compareSync 解密匹配
    const isPasswordValid = bcrypt.compareSync(pass, user.password_salt)

    if (isPasswordValid) {
      return {
        username: user.username,
        id: user.id,
      }
    }
    return null
  }

  /**
   * 生成双 Token
   * @param user
   * @param refreshOnly 是否只生成 authorizationToken
   */
  async generateTokens(user: any, refreshOnly = false) {
    serverLogger.log('[AuthService][generateTokens]', user)
    // 不要放入过多信息，因为内容签名后不可变
    const payload = {
      sub: user.id,
      // username: user.username
    }

    // 生成token，返回给客户端
    return {
      authorizationToken: this.jwtService.sign(payload, {
        secret: APP_JWT_SECRET,
        expiresIn: '15m', // 授权 Token 15m 15分钟过期
      }),
      refreshToken: refreshOnly
        ? undefined
        : this.jwtService.sign(payload, {
            secret: APP_JWT_REFRESH_SECRET,
            expiresIn: '30d', // 刷新 Token 30d 30天过期
          }),
    }
  }

  // 刷新 Token
  async refreshTokens(refreshToken: string) {
    try {
      // 验证刷新 Token
      const {sub} = this.jwtService.verify(
        // 解密刷新token
        myApiEncrypt.decrypt(refreshToken),
        {
          secret: APP_JWT_REFRESH_SECRET,
        },
      )

      // 生成新的授权 Token
      const user = await this.usersService.findUser({id: sub})
      return this.generateTokens(user, true)
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token')
    }
  }
}
