export enum CustomThemeType {
  DEFAULT = 'theme-default',
  WIN98 = 'theme-win98',
  XP = 'theme-xp',
  VISTA = 'theme-vista',
  WIN8 = 'theme-win8',
  CLASSIC = 'theme-classic',
  MINIMALISM = 'theme-minimalism',
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
    label: 'WIN98',
    value: CustomThemeType.WIN98,
  },
  {
    label: 'XP',
    value: CustomThemeType.XP,
  },
  {
    label: 'Vista',
    value: CustomThemeType.VISTA,
  },
  {
    label: 'Win8',
    value: CustomThemeType.WIN8,
  },
  {
    label: 'Classic',
    value: CustomThemeType.CLASSIC,
  },
  {
    label: 'Mac',
    value: CustomThemeType.MAC,
  },
]
