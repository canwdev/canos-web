import {getRandomInt, guid} from '@/utils'
import {useSettingsStore} from '@/store/settings'
import {LoopModeType} from '@/enum/settings'
import musicBus, {MusicEvents} from '@/apps/MusicPlayer/utils/bus'
import {normalizePath} from '@/apps/FileManager/utils'

export interface MusicItem {
  guid: string
  filename: string
  basePath: string
}

export class MusicItem {
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
  musicItem: MusicItem | null
  playingList: MusicItem[]
  playingIndex: number
  paused: boolean
  currentTime: number
  duration: number
  playbackRate: number
  stopCountdown: any // setTimeout timer
  isPlayEnded: boolean
  isLoadedAutoplay: boolean // 是否在加载结束后自动播放
}

export const useMusicStore = defineStore('music', {
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
    playFromList(list: MusicItem[] = [], index = 0) {
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
      const settingsStore = useSettingsStore()
      if (settingsStore.loopMode === LoopModeType.SHUFFLE) {
        this.playShuffle()
        return
      }
      let index = this.playingIndex + 1
      if (index > this.playingList.length - 1) {
        if (settingsStore.loopMode === LoopModeType.LOOP_SEQUENCE) {
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
      const settingsStore = useSettingsStore()
      this.isPlayEnded = true
      if (settingsStore.loopMode === LoopModeType.LOOP_SINGLE) {
        // single loop
        musicBus.emit(MusicEvents.ACTION_PLAY)
        return
      }
      if (settingsStore.loopMode === LoopModeType.LOOP_REVERSE) {
        // reverse play
        this.playPrev()
        return
      }
      if (settingsStore.loopMode === LoopModeType.SHUFFLE) {
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
