import {LsKeys} from '@/enum'
import {IconTheme} from '@/enum/settings'

// /src/utils/file.ts
export const handleAssetsUrl = (url: string) => {
  return new URL(`../${resolvePath(url)}`, import.meta.url).href
}
const resolvePath = (path: string) => {
  if (path.startsWith('@/')) return path.replace('@/', '')
  if (path.startsWith('/')) return path.replace('/', '')
  else return path
}

const iconBaseUrl = './resources/icons'
const settings = JSON.parse(localStorage.getItem(LsKeys.SETTINGS_STORAGE) || '{}')
const iconTheme = settings.iconTheme || IconTheme.ELEMENTARY

export const getIcon = (name) => {
  return `${iconBaseUrl}/${iconTheme}/${name}.svg`
}
