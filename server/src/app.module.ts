import {MiddlewareConsumer, Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {FsModule} from './modules/filesystem/module'
import {isDev} from './utils'
import {ServeStaticModule} from '@nestjs/serve-static'
import {IMAGE_PATH, MUSIC_LIBRARY_PATH} from './modules/filesystem/utils/enum'
import {JwtAuthGuard} from '@/modules/auth/jwt-auth.guard'
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core'
import {CryptInterceptor} from '@/modules/crypt/crypt.interceptor'
import {CryptMiddleware} from '@/modules/crypt/crypt.middleware'
import {UsersModule} from '@/modules/users/users.module'
import {AuthModule} from '@/modules/auth/auth.module'

console.log('isDev', isDev)

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: MUSIC_LIBRARY_PATH,
      serveRoot: '/mfs',
    }),
    ServeStaticModule.forRoot({
      rootPath: IMAGE_PATH,
      serveRoot: '/images',
    }),
    FsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*
    // 开启全局请求加密
    {
      provide: APP_INTERCEPTOR,
      useClass: CryptInterceptor,
    },
*/
    // 在当前 module 下都开启JwtAuth守卫
    // 若要开启一个路由无需登录即可访问的权限，请使用 @SkipAuth() 装饰器
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  /*  configure(consumer: MiddlewareConsumer) {
    // 设置全局请求加密
    consumer.apply(CryptMiddleware).forRoutes('*')
  }*/
}
