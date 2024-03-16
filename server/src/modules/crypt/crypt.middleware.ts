import {Injectable, NestMiddleware} from '@nestjs/common'
import {AppService} from '@/app.service'

@Injectable()
export class CryptMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}

  use(req: any, res: any, next: () => void) {
    const myCrypt = this.appService.getMyCrypt()
    if (!myCrypt) {
      return next()
    }
    // 解密报文
    if (/post/gi.test(req.method) && req.body) {
      const {ie, main} = req.body
      if (ie && main) {
        const decrypted = myCrypt.decrypt(main) || 'null'
        req.body = JSON.parse(decrypted)
        // console.log('POST', req.body)
      }
    }
    if (/get/gi.test(req.method) && req.query) {
      const {ie, main} = req.query
      if (ie && main) {
        const decrypted = myCrypt.decrypt(main) || 'null'
        req.query = JSON.parse(decrypted)
        // console.log('GET', req.query)
      }
    }
    next()
  }
}
