import Service from '@/utils/service'
import {HOST_URL, LsKeys} from '@/enum'
import {CreateEditUserDto} from '@server/modules/users/user.dto'

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
  getUsers(params: any) {
    return service.get('/get-users', {params})
  },
  createUser(dto: CreateEditUserDto) {
    return service.post('/create-user', dto)
  },
  deleteUser(id: string) {
    return service.delete('/delete-user', {params: {id}})
  },
  updateUser(dto: CreateEditUserDto) {
    return service.put('/update-user', dto)
  },
}
