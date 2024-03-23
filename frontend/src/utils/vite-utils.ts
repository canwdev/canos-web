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
export const getIcon = (name) => {
  // return `${iconBaseUrl}/elementary-xfce/${name}.svg`
  return `${iconBaseUrl}/win11/${name}.png`
}
