import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const SERVER_PORT = process.env.PORT || 12021
  const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`
  await app.listen(SERVER_PORT)
  console.log(`Server running at ${SERVER_URL}`)
}
bootstrap()
