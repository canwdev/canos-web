import {BackendFileItem} from '@/enum/file'
import {API_PROXY_BASE} from '@/enum/index'
import {getDetail} from '@/api/filesystem'
import {guid} from '@/utils'

export interface MusicItem {
  guid: string
  fileInfo: BackendFileItem | any
  title: string
  artists: string[]
  album: string
  cover: string
  lyric: string
  // getters:
  allMetadata: any
}

export class MusicItem {
  constructor(data?: BackendFileItem) {
    this.guid = guid()
    this.fileInfo = data || {}
  }

  // 真实文件地址
  get src() {
    return API_PROXY_BASE + '/mfs' + this.fileInfo.path + this.fileInfo.filename
  }

  get titleDisplay() {
    return this.title || this.fileInfo?.filename || ''
  }

  get artistsAlbumDisplay() {
    const {artist, album} = this
    return [artist, album].join(' - ')
  }

  get artist() {
    return (this.artists || []).join(', ')
  }

  async fetchDetail() {
    const detail = await getDetail({
      path: this.fileInfo.path,
      filename: this.fileInfo.filename,
    })
    if (detail.cover) {
      this.cover = API_PROXY_BASE + detail.cover
    }
    this.lyric = detail.lyric || ''

    const {metadata} = detail
    this.title = metadata.common.title || ''
    this.artists = metadata.common.artists || []
    this.album = metadata.common.album || ''

    this.allMetadata = metadata
  }
}
