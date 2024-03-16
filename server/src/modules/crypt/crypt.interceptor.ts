import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common'
import {AppService} from '@/app.service'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

export interface Response<T> {
  data: T
}

@Injectable()
export class CryptInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly appService: AppService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const myCrypt = this.appService.getMyCrypt()

    return next.handle().pipe(
      map((data) => {
        if (!myCrypt) {
          return data
        }
        // 加密报文
        const str = JSON.stringify(data)
        return {
          main: myCrypt.encrypt(str),
          ie: true,
        }
      }),
    )
  }
}
