// all-exceptions.filter.ts
import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common'
import {Response} from 'express'
import {serverLog} from '@/utils/server-log'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception instanceof HttpException ? exception.getStatus() : 500

    const errBody = {
      statusCode: status,
      timestamp: Date.now(),
      path: ctx.getRequest().url,
      message: exception.toString(),
    }

    // 获取错误的堆栈信息
    const stack = exception instanceof Error ? exception.stack : null
    // 记录错误到日志
    serverLog.error(stack + '\n' + JSON.stringify(errBody, null, 2))

    // 发送错误响应
    response.status(status).json(errBody)
  }
}
