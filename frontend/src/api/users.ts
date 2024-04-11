import Service from '@/utils/service'
import {HOST_URL} from '@/enum'

const service = Service({
  baseURL: HOST_URL + '/api/users',
})

export const usersApi = {
  userLogin(username: string, password: string) {
    username = (username || '').trim()
    return service.post('/auth/login', {username, password})
  },
  userGetInfo() {
    return service.get('/auth/profile')
  },
  hasUsers() {
    return service.get('/has-users')
  },
  getUsers() {
    return service.get('/get-users')
  },
  createUser(username: string, password: string) {
    return service.post('/create-user', {username, password})
  },
  deleteUser(id: string) {
    return service.post('/delete-user', {id})
  },
  updateUser(id: string, username: string) {
    return service.post('/update-user', {id, username})
  },
  updatePassword(username: string, oldPassword: string, password: string) {
    return service.post('/update-password', {username, oldPassword, password})
  },
}
