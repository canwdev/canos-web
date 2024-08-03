import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from '@/modules/users/user.entity'
import {Like, Repository} from 'typeorm'
import {CreateEditUserDto} from '@/modules/users/user.dto'
import * as bcrypt from 'bcryptjs'
import {DefaultRootPassword, DefaultRootUsername, IUserInfo, UserRole} from '@/types/user'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findUser(where: any) {
    return this.usersRepository.findOneBy(where)
  }

  async findUsers(where: any = {}) {
    const rolesToFind = where.roles
    delete where.roles
    // console.log(where, rolesToFind)

    // 创建 QueryBuilder 实例
    const queryBuilder = this.usersRepository.createQueryBuilder('user')

    // 动态添加条件
    Object.keys(where).forEach((key) => {
      if (where[key] === undefined || where[key] === null || where[key] === '') {
        return
      }
      if (key === 'username') {
        queryBuilder.andWhere('user.username LIKE :username', {
          username: `%${where[key]}%`, // 使用 % 符号进行模糊匹配
        })
        return
      }

      queryBuilder.andWhere(`user.${key} = :${key}`, {[key]: where[key]})
    })

    // 如果 roles 存在，进行角色匹配
    if (Array.isArray(rolesToFind) && rolesToFind.length > 0) {
      // 用 OR 条件构建查询
      const roleConditions = rolesToFind.map((role) => `user.roles LIKE :role${role}`).join(' AND ')

      rolesToFind.forEach((role, index) => {
        queryBuilder.setParameter(`role${role}`, `%${role}%`)
      })

      // 添加角色条件到查询中
      queryBuilder.andWhere(`(${roleConditions})`)
    }

    // 处理其他条件
    // queryBuilder.andWhere(where)
    // 执行查询
    const users = await queryBuilder.getMany()

    return users.map((user): IUserInfo => {
      return {
        id: user.id,
        username: user.username,
        roles: user.roles.split(',') as UserRole[],
        disabled: user.disabled,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }
    })
  }

  async createUser(createUserDto: CreateEditUserDto) {
    // 检查用户名是否存在
    const find = await this.findUser({username: createUserDto.username})
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

  async deleteUser(id: number) {
    // 禁止删除root
    const user = await this.findUser({id})
    if (user.username === DefaultRootUsername) {
      throw new Error('Cannot delete root user')
    }
    return await this.usersRepository.delete(id)
  }

  async updateUser(editUserDto: CreateEditUserDto) {
    const {id, ...userUpdates} = editUserDto
    // @ts-ignore
    userUpdates.roles = userUpdates.roles.join(',')

    // 从数据库中加载现有用户
    const user = await this.findUser({id})
    if (!user) {
      throw new Error('User not found')
    }
    if (user.username === DefaultRootUsername) {
      if (userUpdates.username !== user.username) {
        throw new Error('Cannot update root username')
      }
      // 禁止禁用
      if (userUpdates.disabled) {
        throw new Error('Cannot disable root user')
      }
      // 禁止删除admin权限
      if (!userUpdates.roles.includes(UserRole.admin)) {
        throw new Error('Cannot remove admin permission from root user')
      }
    }

    // 更新用户属性
    Object.assign(user, userUpdates)

    // 确保如果提供了密码，则更新，否则不更新
    if (userUpdates.password) {
      user.password_salt = bcrypt.hashSync(userUpdates.password, 10)
    }

    // 保存更新，这会触发BeforeUpdate钩子
    return this.usersRepository.save(user)

    // 请勿使用 update，因为：这种行为是不会触发 BeforeUpdate 和 AfterUpdate 钩子的。这是因为 update 方法并不加载实体的完整对象，而是直接执行 SQL 更新操作
    // return this.usersRepository.update(id, user)
  }

  // 生命周期钩子，在模块初始化时执行逻辑
  async onModuleInit() {
    // 检查用户表是否为空
    const userCount = await this.usersRepository.count()
    if (userCount === 0) {
      // 创建默认用户
      const dto: CreateEditUserDto = {
        username: DefaultRootUsername,
        password: DefaultRootPassword,
        roles: [UserRole.admin],
      }
      await this.createUser(dto)
      console.log(`Default user created, please change password!`, dto)
    } else {
      console.log('User table already has records.')
    }
  }
}
