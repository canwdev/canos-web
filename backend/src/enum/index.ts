import * as os from 'os'
import * as Path from 'path'
import * as fs from 'fs-extra'
import {ServerInfo} from '@/types/server'
import {JsonStorage} from '@/utils/json-storage'
import * as crypto from 'crypto'

export const isDev = process.env.NODE_ENV === 'development'

// 配置、数据库和日志存放路径
export const DATA_BASE_PATH = isDev
  ? Path.join(process.cwd(), './data')
  : Path.join(os.homedir(), '/.config/can-os-web')
fs.ensureDirSync(DATA_BASE_PATH)
console.log('[DATA_BASE_PATH]', DATA_BASE_PATH)

export const DATA_CONFIG_PATH = Path.join(DATA_BASE_PATH, 'config')
export const DATA_DESKTOP_PATH = Path.join(DATA_BASE_PATH, 'desktop')
fs.ensureDirSync(DATA_CONFIG_PATH)
fs.ensureDirSync(DATA_DESKTOP_PATH)

interface ISecretStore {
  JWT_SECRET: string
  // 简单接口载荷加密密钥，AES-256 密钥，require('crypto').randomBytes(32).toString('hex')
  EASY_API_CRYPT_KEY: string
}
export const secretsStore = new JsonStorage(Path.join(DATA_CONFIG_PATH, 'secrets.json'), {
  JWT_SECRET: crypto.randomBytes(32).toString('hex'),
  JWT_REFRESH_SECRET: crypto.randomBytes(32).toString('hex'),
  EASY_API_CRYPT_KEY: crypto.randomBytes(16).toString('hex'),
} as ISecretStore)

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
    dataBasePath: DATA_BASE_PATH,
    dataDesktopPath: DATA_DESKTOP_PATH,
  },
}

// If JWT_SECRET is not set, fallback to this
export const APP_JWT_SECRET = process.env.JWT_SECRET || secretsStore.getData().JWT_SECRET
export const APP_JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || secretsStore.getData().JWT_REFRESH_SECRET
