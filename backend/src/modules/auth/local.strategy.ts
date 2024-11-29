import {Strategy} from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import {ForbiddenException, Injectable} from '@nestjs/common'
import {AuthService} from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new ForbiddenException({
        message: 'Invalid username or password',
      })
    }
    return user
  }
}
