export interface BackendFileItem {
  id: number
  filename: string
  isDirectory: boolean
  path: string
  size: string
  birthtime: string
  ctime: string
  mtime: string
}

export const supportedMusicFormat = /\.(mp3|wav|ogg|flac|opus)$/i
export const isSupportedMusicFormat = (name) => supportedMusicFormat.test(name)
