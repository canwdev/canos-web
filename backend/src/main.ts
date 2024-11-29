import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as process from 'process'
import * as opener from 'opener'
import {program} from 'commander'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {AllExceptionsFilter} from '@/all-exceptions.filter'
import {printServerRunningOn} from '@/utils'
import {isDev, isElectron, secretsStore} from '@/enum'
import {ASCII_DIVIDER, BANNER_ASCII_ART} from '@/utils/banner'

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

  if (isDev) {
    // Swagger 步骤
    const config = new DocumentBuilder()
      .setTitle('Web API')
      .setDescription('API Documentation')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)
  }

  const port = options.port || process.env.PORT || 12021
  const host = options.host || process.env.HOST || '0.0.0.0'
  await app.listen(port, host)

  console.log(ASCII_DIVIDER)
  console.log(BANNER_ASCII_ART)
  console.log(ASCII_DIVIDER)
  const ck = secretsStore.getData().EASY_API_CRYPT_KEY
  const params = `?ck=${ck}`
  console.log(`ck: ${ck}`)

  console.log(ASCII_DIVIDER)

  const {localhostUrl, urls} = printServerRunningOn(host, port, params)

  if (isDev) {
    console.log(`API Documents on: ${localhostUrl}/swagger`)
  }

  // console.log(options)
  const openUrl = localhostUrl + `/ip${params}`
  if (isElectron) {
    if (global._electron_ipcMain) {
      // 也可以响应渲染进程的请求
      global._electron_ipcMain.on('message', (event, data) => {
        if (data === 'E_GET_OPEN_URL') {
          event.reply('message', {
            localhostUrl,
            openUrl,
            urls,
          })
        } else {
          console.log(`Received message from render:`, data)
          event.reply('message', '响应渲染进程的请求')
        }
      })
    }
  } else if (process.env.NODE_ENV !== 'development' && options.open) {
    await opener(openUrl)
  }
}
bootstrap()
