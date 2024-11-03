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
  WIDGETS,
  SYSTEM,
  HARDWARE,
}

export enum DesktopBackgroundSize {
  COVER = 'cover',
  CONTAIN = 'contain',
  CENTER = 'center',
  TILE = 'tile',
  STRETCH = 'stretch',
}

export const DESKTOP_FILE_FLAG = 'file'

export const desktopBackgroundSizeOptions = [
  {
    label: 'Fill',
    value: DesktopBackgroundSize.COVER,
  },
  {
    label: 'Fit',
    value: DesktopBackgroundSize.CONTAIN,
  },
  {
    label: 'Center',
    value: DesktopBackgroundSize.CENTER,
  },
  {
    label: 'Tile',
    value: DesktopBackgroundSize.TILE,
  },
  {
    label: 'Stretch',
    value: DesktopBackgroundSize.STRETCH,
  },
]
