import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {FsModule} from './modules/filesystem/module'
import {ConfigModule} from '@nestjs/config'
import {isDev} from './utils'
import {ServeStaticModule} from '@nestjs/serve-static'
import {IMAGE_PATH, MUSIC_LIBRARY_PATH} from './modules/filesystem/utils/enum'

console.log('isDev', isDev)

const envFilePath = isDev
  ? ['.env.development', '.env.development.local']
  : ['.env.production', '.env']

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
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
  providers: [AppService],
})
export class AppModule {}
