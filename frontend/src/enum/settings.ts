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

export enum LoopModeType {
  NONE = 1, // Play stops after last track
  LOOP_SEQUENCE = 2, // Sequence play
  LOOP_REVERSE = 3, // Reverse play
  LOOP_SINGLE = 4, // Single cycle
  SHUFFLE = 5, // Shuffle next
}

export const LoopModeTypeValues = [
  LoopModeType.NONE,
  LoopModeType.LOOP_SEQUENCE,
  LoopModeType.LOOP_REVERSE,
  LoopModeType.LOOP_SINGLE,
  LoopModeType.SHUFFLE,
]

export const loopModeMap = {
  [LoopModeType.NONE]: {
    value: LoopModeType.NONE,
    icon: 'arrow_forward',
    i18nKey: 'msg.play-in-order',
  },
  [LoopModeType.SHUFFLE]: {
    value: LoopModeType.SHUFFLE,
    icon: 'shuffle',
    i18nKey: 'shuffle',
  },
  [LoopModeType.LOOP_SEQUENCE]: {
    value: LoopModeType.LOOP_SEQUENCE,
    icon: 'repeat',
    i18nKey: 'msg.sequential-loop',
  },
  [LoopModeType.LOOP_REVERSE]: {
    value: LoopModeType.LOOP_REVERSE,
    icon: 'repeat',
    className: 'reverse-x',
    i18nKey: 'msg.reverse-loop',
  },
  [LoopModeType.LOOP_SINGLE]: {
    value: LoopModeType.LOOP_SINGLE,
    icon: 'repeat_one',
    i18nKey: 'msg.single-cycle',
  },
}

export enum SettingsTabType {
  PERSONALIZATION,
  PROGRAMS,
  SYSTEM,
}
