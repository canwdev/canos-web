import {MiddlewareConsumer, Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {FsModule} from './modules/filesystem/module'
import {ServeStaticModule} from '@nestjs/serve-static'
import {JwtAuthGuard} from '@/modules/auth/jwt-auth.guard'
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core'
import {CryptInterceptor} from '@/modules/crypt/crypt.interceptor'
import {CryptMiddleware} from '@/modules/crypt/crypt.middleware'
import {UsersModule} from '@/modules/users/users.module'
import {AuthModule} from '@/modules/auth/auth.module'
import {DATA_CONFIG_PATH, isDev} from '@/enum'
import {join} from 'path'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as Path from 'path'
import {User} from '@/modules/users/user.entity'
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'

@Module({
  imports: [
    // https://docs.nestjs.com/security/rate-limiting
    ThrottlerModule.forRoot([
      {
        ttl: 600000, // 时间窗口，单位为ms
        limit: 500, // 在时间窗口内最多允许的请求次数
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: Path.join(DATA_CONFIG_PATH, 'db.sqlite'),
      // 以下代码遍历了本地文件系统，但用webpack打包后的js只是一个main.js，会报错，所以需要手动引入。
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User],
      // TODO: synchronize 在开发环境下可以使用，在生产环境中不要使用 isDev
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    //  静态资源（前端）目录
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../dist-frontend', '/'),
    }),
    FsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 开启全局请求加密
    {
      provide: APP_INTERCEPTOR,
      useClass: CryptInterceptor,
    },
    // 在当前 module 下都开启JwtAuth守卫
    // 若要开启一个路由无需登录即可访问的权限，请使用 @SkipAuth() 装饰器
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 设置全局请求加密
    consumer.apply(CryptMiddleware).forRoutes('*')
  }
}
