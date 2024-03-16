import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api',
  isToast: false,
})

export const serverApi = {
  getServerInfo() {
    return service.get('/server')
  },
  userLogin(data: any) {
    return service.post('/auth/login', data)
  },
  userGetInfo() {
    return service.get('/auth/profile')
  },
}
