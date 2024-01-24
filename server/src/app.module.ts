import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {FsModule} from './modules/filesystem/module'
import {ConfigModule} from '@nestjs/config'
import {isDev} from './utils'

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
    FsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
