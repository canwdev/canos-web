import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {serverSettingsStore} from '@/instances'
import {guid} from '@/utils'
import * as bcrypt from 'bcryptjs'

// 在没有设置账号密码的情况下，允许首次直接登录
let directLoginCount = 0
const maxAllowedDirectLoginCount = 1

@Injectable()
export class UsersService {
  async findUser(username: string) {
    const users = serverSettingsStore.getItem('users')

    return users.find((user) => user.username === username)
  }

  // 检查是否有用户
  hasUsers() {
    const users = serverSettingsStore.getItem('users')
    return !!users.length
  }

  getUsers() {
    const users = serverSettingsStore.getItem('users')

    return users.map((user) => ({id: user.id, username: user.username}))
  }

  // 自动根据情况，直接登录
  autoDirectLogin() {
    // 首次直接登录
    if (directLoginCount < maxAllowedDirectLoginCount) {
      directLoginCount++
      return {
        username: 'SingleLogin',
        id: `single_id_${directLoginCount}_${maxAllowedDirectLoginCount}`,
      }
    }
    throw new HttpException(
      'The first direct login quota has been exhausted. Please set an account password or restart the server.',
      HttpStatus.BAD_REQUEST,
    )
  }

  async createUser({username, password}) {
    const users = serverSettingsStore.getItem('users')

    const user = users.find((user) => user.username === username)
    if (user) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST)
    }

    // 密码加盐
    const passwordSalt = bcrypt.hashSync(password, 10)

    users.push({id: guid(), username, password: passwordSalt})
    serverSettingsStore.setItem('users', users)
    return {
      username,
    }
  }

  async deleteUser(id: string) {
    const users = serverSettingsStore.getItem('users')
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
      users.splice(index, 1)
      serverSettingsStore.setItem('users', users)
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  async updateUser(id: string, username: string) {
    const users = serverSettingsStore.getItem('users')
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
      users[index].username = username
      serverSettingsStore.setItem('users', users)
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  async updatePassword(username: string, oldPassword: string, password: string) {
    const users = serverSettingsStore.getItem('users')
    const index = users.findIndex((user) => user.username === username)
    if (index !== -1) {
      const user = users[index]
      const isPasswordValid = bcrypt.compareSync(oldPassword, user.password)
      if (isPasswordValid) {
        user.password = bcrypt.hashSync(password, 10)
        serverSettingsStore.setItem('users', users)
      } else {
        throw new HttpException('Wrong old password', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }
}
