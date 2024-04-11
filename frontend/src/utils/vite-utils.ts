// /src/utils/file.ts
import {PROXY_BASE_URL} from '@/enum'

export const normalizePath = (path) => {
  return path.replace(/\\/gi, '/').replace(/\/+/gi, '/')
}

export const getStaticUrl = (url: string) => {
  return normalizePath(`${PROXY_BASE_URL}/static/${url}`)
}
