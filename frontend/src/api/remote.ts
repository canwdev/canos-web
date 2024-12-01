import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api/remote',
  isToast: false,
})

export const remoteApi = {
  connect(params) {
    return service.post('/connect', params)
  },
  execute(params) {
    return service.post('/execute', params)
  },
}
