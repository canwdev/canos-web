import * as log4js from 'log4js'
import * as Path from 'path'
import {DATA_BASE_PATH} from '@/enum'

const logConfig = {
  appenders: {
    logFile: {
      type: 'dateFile',
      filename: Path.join(DATA_BASE_PATH, 'logs', 'log'), // 根据日期命名
      pattern: 'yyyy-MM-dd.log',
      keepFileExt: true,
      alwaysIncludePattern: true,
      maxLogSize: 10485760, // 文件大小限制为10MB
      backups: 5, // 保留5个备份文件
      compress: true, // 压缩旧文件
      // layout: {
      //   type: 'pattern',
      //   pattern: '%d %p %c %m%n',
      // },
    },
    out: {
      type: 'console',
    },
  },
  categories: {
    default: {appenders: ['logFile', 'out'], level: 'debug'},
  },
}
log4js.configure(logConfig)
const logger = log4js.getLogger()
logger.level = 'trace'

export const serverLog = logger

// serverLog.trace('ok!')
