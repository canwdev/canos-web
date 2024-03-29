import {Injectable} from '@nestjs/common'
import {MyCrypt} from '@/utils/my-crypt'
import {serverInfo} from '@/enum'

@Injectable()
export class AppService {
  private readonly myCrypt: MyCrypt

  getHello() {
    return serverInfo
  }
  getMyCrypt() {
    return this.myCrypt
  }
}
