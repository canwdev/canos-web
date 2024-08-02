import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password_salt: string

  @Column({default: false})
  disabled: boolean

  @Column('text')
  // UserRole 权限列表，使用半角逗号(,)隔开
  roles: string
}
