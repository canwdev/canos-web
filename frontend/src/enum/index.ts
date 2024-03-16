// server api url
export const HOST_URL_DEFAULT = import.meta.env.VITE_API_HOST
export const API_PROXY_BASE = import.meta.env.VITE_PROXY_BASE || ''
export const HOST_URL = API_PROXY_BASE + HOST_URL_DEFAULT

export const LsKeys = {
  LS_KEY_AUTHORIZATION: 'canos_web_authorization',
}
