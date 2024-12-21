import Service, {getToken} from '@/utils/service'
import {HOST_URL} from '@/enum'
import qs from 'qs'

const baseURL = HOST_URL + '/api/filesystem'
const service = Service({
  baseURL,
})

export const fsWebApi = {
  // fsApi(params) {
  //   return service.post('/fs-api', params)
  // },
  getDrives(params) {
    return service.post('/drives', params)
  },
  getList(params: any = {}) {
    const {path} = params
    return service.post('/list', {
      path,
    })
  },
  getStream(params) {
    return service.get('/stream', {params})
  },
  createDir(params) {
    return service.post('/create-dir', params)
  },
  // 上传，创建或写入文件
  uploadFile(params, config: any = {}) {
    console.log('[uploadFile]', params)
    const {path, file} = params
    const formData = new FormData()
    formData.append('file', file)

    return service.post('/upload-file', formData, {
      params: {path},
      ...config,
    })
  },
  renameEntry(params) {
    return service.post('/rename', params)
  },
  copyPaste(params) {
    return service.post('/copy-paste', params)
  },
  deleteEntry(params) {
    return service.post('/delete', params)
  },
  downloadEntry(params) {
    return service.get('/download', {params})
  },
  createShareLink(params) {
    return service.post('/create-share-link', params)
  },
  async getDownloadShareLink(paths: string[]) {
    const {key} = await this.createShareLink({paths})
    return baseURL + `/download-share?key=${key}`
  },
  // 以纯文本读取文件
  async readFile(path, config = {responseType: 'text'}) {
    const {key} = await this.createShareLink({paths: [path]})
    return service.get(`/download-share?key=${key}`, config)
  },
  async getStreamShareLink(paths) {
    const {key} = await this.createShareLink({paths})
    return baseURL + `/stream-share?key=${key}`
  },
}

export function getDetail(params: any = {}) {
  const {path, filename, updatePlayStat, updateStatOnly} = params
  return service.post('/media-details', {
    path,
    filename,
    updatePlayStat,
    updateStatOnly,
  })
}

export function fileAction(params: any = {}) {
  const {path, filename, action, actionValue} = params
  return service.post('/action', {
    path,
    filename,
    action,
    actionValue,
  })
}

export function saveLyric(params: any = {}) {
  const {filename, lyric} = params

  return service.post('/save-lyric', {
    filename,
    lyric,
  })
}

export function getDownloadUrl(params: any = {}) {
  return HOST_URL + '/api/download?' + qs.stringify(params)
}

export function uploadFile(params, config = {}) {
  const {file, filename, path} = params

  if (!file) {
    throw new Error(`File not found`)
  }

  if (file.size > 500 * 1024 * 1024) {
    throw new Error(`File size too large (<= 500MB)`)
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('filename', filename)
  formData.append('path', path)
  return service.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })
}
