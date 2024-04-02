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

export const JWT_TOKEN_EXPIRE = process.env.JWT_EXPIRES_IN || '30 days'

export const configBasePath = Path.join(serverInfo.homeDir, '/.config/can-os')
fs.ensureDirSync(configBasePath)
console.log('[configBasePath]', configBasePath)

// If JWT_SECRET is not set, fallback to this
export const APP_JWT_SECRET = process.env.JWT_SECRET || 'h6jMfsCe6CzowcjdEGxPJKKdnZ0XudUw'
