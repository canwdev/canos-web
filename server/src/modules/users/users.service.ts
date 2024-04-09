import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {serverSettingsStore} from '@/instances'

// 在没有设置账号密码的情况下，允许首次直接登录
let directLoginCount = 0
const maxAllowedDirectLoginCount = 1

@Injectable()
export class UsersService {
  async findUser(username: string) {
    // TODO: get user by username
    console.log(username)
    return null
  }

  // 检查是否有用户
  hasUsers() {
    const users = serverSettingsStore.getItem('users')
    return !!users.length
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
}
