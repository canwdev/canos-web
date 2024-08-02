export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export const UserRoleOptions = Object.entries(UserRole).map(([key, value]) => {
  return {
    label: key,
    value: value,
  }
})
