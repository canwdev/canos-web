import {getRandomInt, guid} from '@/utils'
import {useSettingsStore} from '@/store/settings'
import {LoopModeType} from '@/enum/settings'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {normalizePath} from '@/apps/FileManager/utils'
import EventEmitter from '@/utils/event-emitter'

export interface MusicItem {
  guid: string
  filename: string
  basePath: string
}

export class MusicItem extends EventEmitter {
  constructor(filename, basePath) {
    super()
    this.guid = guid()
    this.filename = filename
    this.basePath = basePath
  }

  get absPath() {
    return normalizePath(this.basePath + '/' + this.filename)
  }
}

export interface MusicStore {
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

export class MusicStore {
  constructor() {
    this.musicItem = null
    // current playing list
    this.playingList = []
    // playing music index in playingList
    this.playingIndex = 0
    // is current playing paused
    this.paused = true
    this.currentTime = 0
    this.duration = 0
    this.playbackRate = 1
    this.stopCountdown = null
    this.isPlayEnded = false
    this.isLoadedAutoplay = true
  }
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
  }
  playPrev() {
    let index = this.playingIndex - 1
    if (index < 0) {
      index = this.playingList.length - 1
    }
    this.playByIndex(index)
  }
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
  }
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
  }
  handlePlayEnded() {
    const settingsStore = useSettingsStore()
    this.isPlayEnded = true
    if (settingsStore.loopMode === LoopModeType.LOOP_SINGLE) {
      // single loop
      globalEventBus.emit(GlobalEvents.ACTION_PLAY)
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
  }
  playByIndex(index: number) {
    this.musicItem = this.playingList[index]
    this.playingIndex = index
    console.log('[playByIndex]', index, this.musicItem)
    setTimeout(() => {
      if (this.isPlayEnded) {
        globalEventBus.emit(GlobalEvents.ACTION_PLAY)
        this.isPlayEnded = false
      } else if (this.paused) {
        globalEventBus.emit(GlobalEvents.ACTION_PLAY)
      }
    }, 100)
  }
}
