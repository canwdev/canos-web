export enum LdThemeType {
  SYSTEM = 0,
  LIGHT = 1,
  DARK = 2,
}

export const ldThemeOptions = [
  {
    label: 'Auto',
    value: LdThemeType.SYSTEM,
  },
  {
    label: 'Light',
    value: LdThemeType.LIGHT,
  },
  {
    label: 'Dark',
    value: LdThemeType.DARK,
  },
]

export enum SettingsTabType {
  PERSONALIZATION,
  PROGRAMS,
  SYSTEM,
  HARDWARE,
  USERS,
}
