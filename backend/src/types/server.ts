export type ServerInfo = {
  name: string
  version: string
  hostUrls: string[]
  os: {
    hostname: string
    platform: string
    release: string
    arch: string
    type: string
    version: string
    cpu: string
  }
  dirs: {
    osHomedir: string
    osTmpdir: string
    dataBasePath: string
    dataDesktopPath: string
  }
}

export interface IEntry {
  name: string
  ext: string
  isDirectory: boolean
  hidden: boolean
  lastModified: number
  birthtime: number
  size?: number
  error?: string
  mimeType?: string
}

export interface IDrive {
  label: string
  path: string
  free?: number
  total?: number
}

export enum SortType {
  default = 'default',
  name = 'name',
  nameDesc = 'nameDesc',
  size = 'size',
  sizeDesc = 'sizeDesc',
  extension = 'extension',
  extensionDesc = 'extensionDesc',
  lastModified = 'lastModified',
  lastModifiedDesc = 'lastModifiedDesc',
  birthTime = 'birthTime',
  birthTimeDesc = 'birthTimeDesc',
}
