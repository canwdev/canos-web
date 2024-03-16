import * as os from 'os'
import * as Path from 'path'
import * as fs from 'fs-extra'
import {ServerInfo} from '@/types/server'

export const isDev = process.env.NODE_ENV === 'development'

export const serverInfo: ServerInfo = {
  name: 'CanOS Server',
  version: process.env.npm_package_version,
  homeDir: os.homedir(),
  platform: os.platform(),
  hostname: os.hostname(),
}

export const JWT_TOKEN_EXPIRE = '3 days'
export const CODE_CLIENT_FORBIDDEN = 403

// TODO: env
export const configBasePath = Path.join(serverInfo.homeDir, '/.config/canos-web')
fs.ensureDirSync(configBasePath)
console.log('[configBasePath]', configBasePath)
export const dataBaseDir = 'D:\\Downloads'

// If JWT_SECRET is not set, fallback to this
export const APP_JWT_SECRET_FALLBACK = 'h6jMfsCe6CzowcjdEGxPJKKdnZ0XudUw'
