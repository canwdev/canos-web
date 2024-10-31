import {guid} from '@/utils'
import {normalizePath} from '@/apps/FileManager/utils'
import {regSupportedMusicFormat, regSupportedVideoFormat} from '@/utils/is'

export type MediaType = 'music' | 'video'

export interface MediaItem {
  guid: string
  filename: string
  basePath: string
  type: MediaType
}

export class MediaItem {
  constructor(filename, basePath) {
    this.guid = guid()
    this.filename = filename
    this.basePath = basePath
    this.type = regSupportedMusicFormat.test(filename) ? 'music' : 'video'
  }

  get absPath() {
    return normalizePath(this.basePath + '/' + this.filename)
  }

  get titleDisplay() {
    return this.filename
  }
}

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
    i18nKey: 'msg.play-in-order',
    icon: '➡️',
  },
  [LoopModeType.SHUFFLE]: {
    value: LoopModeType.SHUFFLE,
    i18nKey: 'shuffle',
    icon: '🔀',
  },
  [LoopModeType.LOOP_SEQUENCE]: {
    value: LoopModeType.LOOP_SEQUENCE,
    icon: '🔁',
    i18nKey: 'msg.sequential-loop',
  },
  [LoopModeType.LOOP_REVERSE]: {
    value: LoopModeType.LOOP_REVERSE,
    icon: '🔁',
    className: 'reverse-x',
    i18nKey: 'msg.reverse-loop',
  },
  [LoopModeType.LOOP_SINGLE]: {
    value: LoopModeType.LOOP_SINGLE,
    icon: '🔂',
    i18nKey: 'msg.single-cycle',
  },
}

interface IMusicSettings {
  // 循环模式
  loopMode: LoopModeType
  // 音量
  audioVolume: number
}

export const useMusicSettingsStore = defineStore('musicSettings', {
  state: (): IMusicSettings => {
    return {
      loopMode: LoopModeType.LOOP_SEQUENCE,
      audioVolume: 100,
    }
  },
  actions: {
    setAudioVolume(value) {
      value = Number(value)

      if (value > 100) {
        value = 100
      }
      if (value < 0) {
        value = 0
      }

      // console.log(value)

      this.audioVolume = value
    },
    volumeUp(step = 5) {
      const volume = this.audioVolume + step
      this.setAudioVolume(volume)
    },
    volumeDown(step = 5) {
      const volume = this.audioVolume - step
      this.setAudioVolume(volume)
    },
  },
  persist: {
    key: 'ls_key_canos_media_settings',
  },
})
