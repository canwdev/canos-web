import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as process from 'process'
import * as opener from 'opener'
import * as os from 'os'
import {program} from 'commander'
import {serverInfo} from '@/enum'

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

  const app = await NestFactory.create(AppModule)
  // 设置全局接口前缀
  app.setGlobalPrefix('api')

  const protocol = 'http://'

  const port = options.port || process.env.PORT || 12021
  const host = options.host || process.env.HOST || '0.0.0.0'
  await app.listen(port, host)

  const ifaces = os.networkInterfaces()
  const localhostUrl = protocol + '127.0.0.1' + ':' + port
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

  console.log(options)
  if (process.env.NODE_ENV !== 'development' && options.open) {
    await opener(localhostUrl + '/#/ip')
  }
}
bootstrap()
