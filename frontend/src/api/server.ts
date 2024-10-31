import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api/server',
  isToast: false,
})

export const serverApi = {
  getHello() {
    return service.get('/')
  },
  getServerInfo() {
    return service.get('server-info')
  },
  shutdown() {
    return service.post('/shutdown')
  },
}
