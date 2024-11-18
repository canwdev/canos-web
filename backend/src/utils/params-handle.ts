import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common'
import {Observable} from 'rxjs'

/**
 * 自动删除query参数中的空参数
 */
@Injectable()
export class RemoveEmptyQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const query = request.query

    // 遍历查询参数，删除空值属性，将布尔值字符串转换为布尔值
    for (const key in query) {
      if (query[key] === undefined || query[key] === null || query[key] === '') {
        delete query[key]
      } else if (query[key] === 'true') {
        query[key] = true
      } else if (query[key] === 'false') {
        query[key] = false
      }
    }

    return next.handle()
  }
}
