import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {myApiEncrypt} from '@/utils/my-crypt'

export interface Response<T> {
  data: T
}

@Injectable()
export class CryptInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const myCrypt = myApiEncrypt

    return next.handle().pipe(
      map((data) => {
        if (!myCrypt) {
          return data
        }
        // 加密报文
        const str = JSON.stringify(data)
        return {
          main: myCrypt.encrypt(str),
        }
      }),
    )
  }
}
