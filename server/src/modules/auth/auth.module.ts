import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UsersModule} from '../users/users.module'
import {JwtModule} from '@nestjs/jwt'
import {APP_JWT_SECRET_FALLBACK} from '@/enum'
import {LocalStrategy} from '@/modules/auth/local.strategy'
import {PassportModule} from '@nestjs/passport'
import {JwtStrategy} from '@/modules/auth/jwt.strategy'
import {isDev} from '@/utils'
import {ConfigModule} from '@nestjs/config'

const envFilePath = isDev
  ? ['.env.development', '.env.development.local']
  : ['.env.production', '.env']

@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true,
      isGlobal: true,
      envFilePath,
    }),
    UsersModule,
    PassportModule,
    // https://github.com/auth0/node-jsonwebtoken#usage
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || APP_JWT_SECRET_FALLBACK,
      signOptions: {expiresIn: process.env.JWT_EXPIRES_IN || '1d'},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

console.log(process.env.JWT_SECRET)
