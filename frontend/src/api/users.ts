import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api/users',
})

export const usersApi = {
  userLogin(data: any) {
    return service.post('/auth/login', data)
  },
  userGetInfo() {
    return service.get('/auth/profile')
  },
  hasUsers() {
    return service.get('/has-users')
  },
}
