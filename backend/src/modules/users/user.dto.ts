import {ApiProperty} from '@nestjs/swagger'
import {UserRole} from '@/types/user'

export class CreateEditUserDto {
  // 编辑时传入
  @ApiProperty({nullable: true, description: 'The ID of the user to be operated'})
  id?: number

  @ApiProperty({example: 'root', description: 'The username of user'})
  username: string

  // 新建时必传，编辑时非必传
  @ApiProperty({nullable: true, description: 'The password of new user'})
  password?: string

  // 编辑时传入
  @ApiProperty({nullable: true, description: 'Whether the user is disabled'})
  disabled?: boolean

  @ApiProperty({example: ['admin', 'user'], description: 'The roles of user'})
  roles: UserRole[]
}
