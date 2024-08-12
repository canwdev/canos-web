import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import {IUserInfo, UserRole} from '@/types/user'
import {serverLog} from '@/utils/server-log'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    serverLog.log('[AuthService][validateUser]', username)
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

  // 生成access_token
  async login(user) {
    serverLog.log('[AuthService][login]', user)
    // 不要放入过多信息，因为内容签名后不可变
    const payload = {sub: user.id}
    return {
      // 生成token，返回给客户端
      access_token: this.jwtService.sign(payload),
    }
  }
}
