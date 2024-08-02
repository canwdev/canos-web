import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from '@/modules/users/user.entity'
import {Repository} from 'typeorm'
import {CreateEditUserDto} from '@/modules/users/user.dto'
import * as bcrypt from 'bcryptjs'
import {UserRole} from '@/types/user'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findUser(username: string) {
    return this.usersRepository.findOneBy({username})
  }

  async findUsers() {
    return (await this.usersRepository.find()).map((user) => {
      return {
        id: user.id,
        username: user.username,
        roles: user.roles.split(','),
      }
    })
  }

  async createUser(createUserDto: CreateEditUserDto) {
    // 检查用户名是否存在
    const find = await this.findUser(createUserDto.username)
    if (find) {
      throw new Error('Username already exists')
    }

    // 密码加盐
    const passwordSalt = bcrypt.hashSync(createUserDto.password, 10)
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password_salt: passwordSalt,
      roles: createUserDto.roles.join(','),
      disabled: false,
    })
    return this.usersRepository.save(user)
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id)
  }

  updateUser(editUserDto: CreateEditUserDto) {
    const {id, ...user} = editUserDto as any
    user.roles = user.roles.join(',')

    // 不更新密码的情况
    if (!user.password) {
      delete user.password
    }
    return this.usersRepository.update(id, user)
  }

  // 生命周期钩子，在模块初始化时执行逻辑
  async onModuleInit() {
    // 检查用户表是否为空
    const userCount = await this.usersRepository.count()
    if (userCount === 0) {
      // 创建默认用户
      const dto: CreateEditUserDto = {
        username: 'root',
        password: 'root',
        roles: [UserRole.admin],
      }
      await this.createUser(dto)
      console.log(`Default user created, please change password!`, dto)
    } else {
      console.log('User table already has records.')
    }
  }
}
