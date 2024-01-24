import {Injectable} from '@nestjs/common'
import * as process from 'process'

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'canos-web-server',
      version: process.env.npm_package_version,
      author: 'canwdev',
      repository: 'https://github.com/canwdev/canos-web',
    }
  }
}
