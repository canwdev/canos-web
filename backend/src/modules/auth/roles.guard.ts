import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {ROLES_KEY} from './roles.decorator'
import {serverLogger} from '@/utils/server-log'
import {UsersService} from '@/modules/users/users.service'
import {UserRole} from '@/types/user'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取当前处理的路由的方法
    const handler = context.getHandler()
    const controller = context.getClass()

    // 先检查方法上的角色
    const roles =
      this.reflector.get<string[]>(ROLES_KEY, handler) ||
      this.reflector.get<string[]>(ROLES_KEY, controller)
    // 如果没有设置角色，不允许访问
    if (!roles) {
      return false
    }

    // 从 JWT 获取当前用户 id
    const req = context.switchToHttp().getRequest()
    const user = await this.usersService.getUserProfile(req.user.sub)
    serverLogger.trace('[RolesGuard][canActivate]', roles, user)

    // 检查用户角色
    return (
      user &&
      user.roles.some((role) => {
        return roles.includes(role)
      })
    )
  }
}
