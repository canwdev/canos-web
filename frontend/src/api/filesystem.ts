import Service from '@/utils/service'
import {HOST_URL} from '@/enum'
import qs from 'qs'

const service = Service({
  baseURL: HOST_URL + '/api/filesystem',
})

export const osWebApi = {
  fsApi(params) {
    return service.post('/fs-api', params)
  },
}

export function getList(params: any = {}) {
  const {path, getPlayStat} = params
  return service.post('/list', {
    path,
    getPlayStat,
  })
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
