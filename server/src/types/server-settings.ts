export interface IUser {
  id: string
  username: string
  password: string
}

export interface IServerSettings {
  users: IUser[]
}
