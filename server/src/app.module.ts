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
import {isDev} from '@/enum'
import {join} from 'path'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: isDev, // 在开发环境下可以使用，生产环境下尽量关闭
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
