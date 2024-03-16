import {Injectable} from '@nestjs/common'
import {UserModel} from '@/db/model/user'

@Injectable()
export class UsersService {
  async findUser(username: string) {
    // TODO: type
    const user: any = await UserModel.findOne({
      where: {
        username,
      },
    })
    return user
  }
}
