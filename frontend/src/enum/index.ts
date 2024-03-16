// server api url
export const HOST_URL_DEFAULT = import.meta.env.VITE_API_HOST
export const API_PROXY_BASE = import.meta.env.VITE_PROXY_BASE || ''
export const HOST_URL = API_PROXY_BASE + HOST_URL_DEFAULT

export const LsKeys = {
  LS_KEY_AUTHORIZATION: 'canos_web_authorization',
  STARED_PATH: 'canos_web_explorer_stared_path',
  SHOW_HIDDEN_FILES: 'canos_web_explorer_show_hidden_files',
  EXPLORER_IS_GRID_VIEW: 'canos_web_explorer_is_grid_view',
  EXPLORER_SORT_MODE: 'canos_web_explorer_sort_mode',
}
