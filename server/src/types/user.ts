export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export const DefaultRootUsername = 'root'
export const DefaultRootPassword = 'root'

export const UserRoleOptions = Object.entries(UserRole).map(([key, value]) => {
  return {
    label: key,
    value: value,
  }
})

export const DisabledOptions = [
  {
    label: 'Disabled',
    value: true,
  },
  {
    label: 'Enable',
    value: false,
  },
]

export interface IUserInfo {
  id: number
  username: string
  roles: UserRole[]
  disabled: boolean
  created_at?: number
  updated_at?: number
}
