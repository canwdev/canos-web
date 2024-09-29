import {getRandomInt, guid} from '@/utils'
import musicBus, {MusicEvents} from '@/apps/MusicPlayer/utils/bus'
import {normalizePath} from '@/apps/FileManager/utils'

export interface MediaItem {
  guid: string
  filename: string
  basePath: string
}

export class MediaItem {
  constructor(filename, basePath) {
    this.guid = guid()
    this.filename = filename
    this.basePath = basePath
  }

  get absPath() {
    return normalizePath(this.basePath + '/' + this.filename)
  }

  get titleDisplay() {
    return this.filename
  }
}

type IStore = {
  musicItem: MediaItem | null
  playingList: MediaItem[]
  playingIndex: number
  paused: boolean
  currentTime: number
  duration: number
  playbackRate: number
  stopCountdown: any // setTimeout timer
  isPlayEnded: boolean
  isLoadedAutoplay: boolean // 是否在加载结束后自动播放
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

export const useMediaStore = defineStore('media', {
  state: (): IStore => {
    return {
      musicItem: null,
      playingList: [], // current playing list
      playingIndex: 0, // playing music index in playingList
      paused: true, // is current playing paused
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      stopCountdown: null,
      isPlayEnded: false,
      isLoadedAutoplay: true,
    }
  },
  actions: {
    /**
     * 从文件列表播放音乐
     */
    playFromList(list: MediaItem[] = [], index = 0) {
      const playItem = list[index]
      if (!playItem) {
        window.$message.error(`index=${index} not found`)
        return
      }

      this.playingList = list
      this.playingIndex = index
      this.musicItem = playItem

      this.isLoadedAutoplay = true
    },
    playPrev() {
      let index = this.playingIndex - 1
      if (index < 0) {
        index = this.playingList.length - 1
      }
      this.playByIndex(index)
    },
    playShuffle() {
      function getRandomIndex(array: any[], excludedIndex: number) {
        const availableIndexes = array.reduce((acc, _, index) => {
          if (index !== excludedIndex) {
            acc.push(index)
          }
          return acc
        }, [])
        const randomIndex = getRandomInt(0, availableIndexes.length - 1)
        return availableIndexes[randomIndex]
      }
      this.playByIndex(getRandomIndex(this.playingList, this.playingIndex))
    },
    playNext() {
      const mSettingsStore = useMusicSettingsStore()
      if (mSettingsStore.loopMode === LoopModeType.SHUFFLE) {
        this.playShuffle()
        return
      }
      let index = this.playingIndex + 1
      if (index > this.playingList.length - 1) {
        if (mSettingsStore.loopMode === LoopModeType.LOOP_SEQUENCE) {
          // loop list from first
          index = 0
        } else {
          // stop at last
          return
        }
      }
      this.playByIndex(index)
    },
    handlePlayEnded() {
      const mSettingsStore = useMusicSettingsStore()
      this.isPlayEnded = true
      if (mSettingsStore.loopMode === LoopModeType.LOOP_SINGLE) {
        // single loop
        musicBus.emit(MusicEvents.ACTION_PLAY)
        return
      }
      if (mSettingsStore.loopMode === LoopModeType.LOOP_REVERSE) {
        // reverse play
        this.playPrev()
        return
      }
      if (mSettingsStore.loopMode === LoopModeType.SHUFFLE) {
        this.playShuffle()
        return
      }
      this.playNext()
    },
    playByIndex(index: number) {
      this.musicItem = this.playingList[index]
      this.playingIndex = index
      console.log('[playByIndex]', index, this.musicItem)
      setTimeout(() => {
        if (this.isPlayEnded) {
          musicBus.emit(MusicEvents.ACTION_PLAY)
          this.isPlayEnded = false
        } else if (this.paused) {
          musicBus.emit(MusicEvents.ACTION_PLAY)
        }
      }, 100)
    },
  },
})

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
