import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  username: string

  @Column()
  password_salt: string

  @Column({default: false})
  disabled: boolean

  @Column('text')
  // UserRole 权限列表，使用半角逗号(,)隔开
  roles: string

  @Column({type: 'int'})
  created_at: number

  @Column({type: 'int'})
  updated_at: number

  // https://github.com/typeorm/typeorm/issues/400
  @BeforeUpdate()
  public setUpdatedAt() {
    // console.log('setUpdatedAt')
    this.updated_at = Date.now()
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = Date.now()
    this.updated_at = Date.now()
  }
}
