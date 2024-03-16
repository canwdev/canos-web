import {Injectable} from '@nestjs/common'
import * as process from 'process'
import {MyCrypt} from '@/utils/my-crypt'

@Injectable()
export class AppService {
  private readonly myCrypt: MyCrypt

  getHello() {
    return {
      name: 'canos-web-server',
      version: process.env.npm_package_version,
      author: 'canwdev',
      repository: 'https://github.com/canwdev/canos-web',
    }
  }
  getMyCrypt() {
    return this.myCrypt
  }
}
