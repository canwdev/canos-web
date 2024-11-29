import * as log4js from 'log4js'
import * as Path from 'path'
import {DATA_BASE_PATH, isElectron} from '@/enum'

const electronLoggerModule = {
  configure: (config) => {
    return (logEvent) => {
      if (global._electron_mainWindow) {
        global._electron_mainWindow.webContents.send('console-log', {
          type: logEvent.level.levelStr.toLowerCase(),
          args: logEvent.data.map((arg) =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
          ),
          timestamp: logEvent.startTime,
        })
      }
    }
  },
}

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
    electronLogger: {
      type: electronLoggerModule,
    },
  },
  categories: {
    default: {
      appenders: ['logFile', 'out', isElectron && 'electronLogger'].filter(Boolean),
      level: 'debug',
    },
  },
}
log4js.configure(logConfig)
const logger = log4js.getLogger()
logger.level = 'trace'

export const serverLogger = logger

// serverLogger.trace('ok!')
