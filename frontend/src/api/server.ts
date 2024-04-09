import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api/server',
  isToast: false,
})

export const serverApi = {
  getServerInfo() {
    return service.get('/')
  },
  shutdown() {
    return service.post('/shutdown')
  },
}
