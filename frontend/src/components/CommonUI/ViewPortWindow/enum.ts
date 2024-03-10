export enum CustomThemeType {
  DEFAULT = 'theme-default',
  CLASSIC = 'theme-classic',
  MINIMALISM = 'theme-minimalism',
  WIN98 = 'theme-win98',
  XP = 'theme-xp',
  WIN7 = 'theme-win7',
  WIN8 = 'theme-win8',
  MAC = 'theme-mac',
}

export const customThemeOptions = [
  {
    label: 'Default',
    value: CustomThemeType.DEFAULT,
  },
  {
    label: 'Minimalism',
    value: CustomThemeType.MINIMALISM,
  },
  {
    label: 'Classic',
    value: CustomThemeType.CLASSIC,
  },
  {
    label: 'Win98',
    value: CustomThemeType.WIN98,
  },
  {
    label: 'WinXP',
    value: CustomThemeType.XP,
  },
  {
    label: 'Win7',
    value: CustomThemeType.WIN7,
  },
  {
    label: 'Win8',
    value: CustomThemeType.WIN8,
  },
  {
    label: 'Mac',
    value: CustomThemeType.MAC,
  },
]
