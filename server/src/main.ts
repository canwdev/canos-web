import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as process from 'process'
import * as opener from 'opener'
import * as os from 'os'
import {program} from 'commander'
import {serverInfo} from '@/enum'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {AllExceptionsFilter} from '@/all-exceptions.filter'
import {logger} from 'sequelize/types/utils/logger'

program
  .name('canos-web-server')
  .description('A Nest.js server')
  .option('-p, --port <port>', 'Specify the port number, default 12021')
  .option('-h, --host <host>', 'Specify the host address, default 0.0.0.0')
  .option('--no-open', 'Prevent open WebUI at start')
  .option('-H, --help', 'Show all available options')
  .parse(process.argv)
const options = program.opts()

async function bootstrap() {
  if (options.help) {
    console.log(program.help())
    return
  }

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'verbose'],
  })
  // 设置全局接口前缀
  app.setGlobalPrefix('api')

  // 使用全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter())

  const protocol = 'http://'

  // Swagger 步骤
  const config = new DocumentBuilder()
    .setTitle('Web API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const port = options.port || process.env.PORT || 12021
  const host = options.host || process.env.HOST || '0.0.0.0'
  await app.listen(port, host)

  const ifaces = os.networkInterfaces()
  const localhostUrl = protocol + '127.0.0.1' + ':' + port

  console.log(`API Documents on: ${localhostUrl}/swagger`)

  const urls = []
  Object.keys(ifaces).forEach(function (dev) {
    ifaces[dev].forEach(function (details) {
      if (details.family === 'IPv4') {
        const url = protocol + details.address + ':' + port
        urls.push(url)
        serverInfo.hostUrls.push(url)
      }
    })
  })
  console.log(`Server running on: ${localhostUrl}`)
  console.log(`Available on:`)
  console.log(urls.join('\n'))

  // console.log(options)
  if (process.env.NODE_ENV !== 'development' && options.open) {
    await opener(localhostUrl + '/ip')
  }
}
bootstrap()
