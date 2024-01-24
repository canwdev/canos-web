import {getClientHostUrl} from '@/utils/client'
import {LoopModeType} from '@/enum/settings'

// server api url
export const HOST_URL_DEFAULT = getClientHostUrl()
export const API_PROXY_BASE = import.meta.env.VITE_PROXY_BASE || ''
export const HOST_URL = API_PROXY_BASE + HOST_URL_DEFAULT
