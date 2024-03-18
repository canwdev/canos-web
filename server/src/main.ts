import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as process from 'process'
import * as opener from 'opener'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 设置全局接口前缀
  app.setGlobalPrefix('api')

  const SERVER_PORT = process.env.PORT || 12021
  const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`
  await app.listen(SERVER_PORT)
  console.log(`Server running at ${SERVER_URL}`)

  if (process.env.NODE_ENV !== 'development') {
    await opener(SERVER_URL)
  }
}
bootstrap()
