// /src/utils/file.ts
export const handleAssetsUrl = (url: string) => {
  return new URL(`../${resolvePath(url)}`, import.meta.url).href
}
const resolvePath = (path: string) => {
  if (path.startsWith('@/')) return path.replace('@/', '')
  if (path.startsWith('/')) return path.replace('/', '')
  else return path
}
