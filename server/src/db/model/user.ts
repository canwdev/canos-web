import Sequelize from 'sequelize'
import {sequelize} from '../sequelize'
import * as bcrypt from 'bcryptjs'

export const UserModel = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(500),
      allowNull: false,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10))
      },
    },
    role: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: 'Permission Role',
    },
    nickname: {
      type: Sequelize.STRING(50),
      comment: 'Nickname',
    },
    avatar: {
      type: Sequelize.STRING(200),
      comment: 'Avatar image',
    },
  },
  {timestamps: true},
)

// create will run when table not exists
UserModel.sync({
  force: false,
  // alter: true
}).then(async function () {
  const count = await UserModel.count()
  // if empty create a user
  if (count === 0) {
    return UserModel.create({
      username: 'admin',
      password: 'admin',
      role: 'admin',
      nickname: 'Administrator',
      avatar: '',
    })
  }
})
