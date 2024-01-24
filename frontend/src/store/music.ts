import {MusicItem} from '@/enum/music'
import {BackendFileItem, isSupportedMusicFormat} from '@/enum/file'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {getRandomInt} from '@/utils'
import {useSettingsStore} from '@/store/settings'
import {LoopModeType} from '@/enum/settings'

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
      musicItem: new MusicItem(),
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
    playFromFiles(item: BackendFileItem, fileList: BackendFileItem[] = []) {
      if (isSupportedMusicFormat(item.filename)) {
        // format data
        let list = fileList
          .filter((i) => {
            return isSupportedMusicFormat(i.filename)
          })
          .map((i) => {
            return new MusicItem(i)
          })

        const idx = list.findIndex((i) => i.fileInfo.id === item.id)
        const playItem = list[idx]

        this.playingList = list
        this.playingIndex = idx
        this.musicItem = playItem

        this.isLoadedAutoplay = true
        return
      }
      window.$message.error('格式不支持')
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
    },
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
    },
  },
})
