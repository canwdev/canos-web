import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api',
  isToast: false,
})

export function getServerInfo() {
  return service.get('/')
}

export function getAuth(params) {
  return service.post('/auth', params)
}
