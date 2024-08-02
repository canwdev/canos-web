import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    console.log('[validateUser]', username)
    const user = await this.usersService.findUser(username)

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
    console.log('[AuthService login]', user)
    const payload = {username: user.username, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
