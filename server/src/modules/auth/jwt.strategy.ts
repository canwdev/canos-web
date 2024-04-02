import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import {APP_JWT_SECRET} from '@/enum'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_JWT_SECRET,
    })
  }

  // 内部函数自动执行。
  async validate(payload: any) {
    return {id: payload.sub, username: payload.username}
  }
}
