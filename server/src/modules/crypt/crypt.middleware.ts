import {Injectable, NestMiddleware} from '@nestjs/common'
import {myApiEncrypt} from '@/utils/my-crypt'

@Injectable()
export class CryptMiddleware implements NestMiddleware {
  constructor() {}

  use(req: any, res: any, next: () => void) {
    const myCrypt = myApiEncrypt
    if (!myCrypt) {
      return next()
    }
    // 解密报文
    if (req.body && req.body.main) {
      const decrypted = myCrypt.decrypt(req.body.main) || 'null'
      req.body = JSON.parse(decrypted)
      // console.log('POST', req.body)
    }
    if (req.query && req.query.main) {
      const decrypted = myCrypt.decrypt(req.query.main) || 'null'
      req.query = JSON.parse(decrypted)
      // console.log('GET', req.query)
    }
    next()
  }
}
