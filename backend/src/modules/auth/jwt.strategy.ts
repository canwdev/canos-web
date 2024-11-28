import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common'
import {APP_JWT_SECRET} from '@/enum'
import {UsersService} from '@/modules/users/users.service'
import {serverLogger} from '@/utils/server-log'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_JWT_SECRET,
    })
  }

  // 内部函数自动执行。
  // payload 来自 jwtService.sign(user)
  async validate(payload) {
    // 检查用户是否可用
    const user = await this.usersService.findUser({id: payload.sub})
    if (!user) {
      throw new UnauthorizedException()
    }
    if (user.disabled) {
      throw new ForbiddenException()
    }
    serverLogger.trace('[JwtStrategy][validate]', payload)
    return payload
  }
}
