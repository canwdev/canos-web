export type ServerInfo = {
  name: string
  version: string
  homeDir: string
  platform: NodeJS.Platform
  hostname: string
}

export interface IEntry {
  name: string
  isDirectory: boolean
  hidden: boolean
  lastModified: number
  size?: number
  error?: string
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
}
