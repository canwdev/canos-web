import * as os from 'os'
import * as Path from 'path'
import * as fs from 'fs-extra'
import {ServerInfo} from '@/types/server'

export const isDev = process.env.NODE_ENV === 'development'

export const JWT_TOKEN_EXPIRE = process.env.JWT_EXPIRES_IN || '30 days'

// 配置、数据库和日志存放路径
export const dataBasePath = isDev
  ? Path.join(process.cwd(), './data')
  : Path.join(os.homedir(), '/.config/can-os-web')
fs.ensureDirSync(dataBasePath)
console.log('[dataBasePath]', dataBasePath)

export const dataDesktopPath = Path.join(dataBasePath, 'desktop')
fs.ensureDirSync(dataDesktopPath)

export const serverInfo: ServerInfo = {
  name: 'CanOS Server',
  version: process.env.npm_package_version,
  hostUrls: [],
  os: {
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    type: os.type(),
    version: os.version(),
    cpu: os.cpus()[0].model,
  },
  dirs: {
    osHomedir: os.homedir(),
    osTmpdir: os.tmpdir(),
    dataBasePath,
    dataDesktopPath,
  },
}

// If JWT_SECRET is not set, fallback to this
export const APP_JWT_SECRET = process.env.JWT_SECRET || 'h6jMfsCe6CzowcjdEGxPJKKdnZ0XudUw'
