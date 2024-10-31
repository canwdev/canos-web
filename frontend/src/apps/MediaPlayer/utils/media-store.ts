import {getRandomInt} from '@/utils'
import {LoopModeType, MediaItem, useMusicSettingsStore} from '@/apps/MediaPlayer/utils/music-state'
import mitt from 'mitt'

type IStore = {
  mediaBus: mitt
  mediaItem: MediaItem | null
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

export const MusicEvents = {
  ACTION_PLAY: 'ACTION_PLAY',
  ACTION_PAUSE: 'ACTION_PAUSE',
  ACTION_TOGGLE_PLAY: 'ACTION_TOGGLE_PLAY',
  ACTION_CHANGE_CURRENT_TIME: 'ACTION_CHANGE_CURRENT_TIME',
  ACTION_LOCATE_FILE: 'ACTION_LOCATE_FILE',
}
// 创建多个实例的store
export const useMediaStore = (uniqueStoreName = 'mediaStore') => {
  const Store = defineStore(uniqueStoreName, {
    state: (): IStore => {
      return {
        mediaBus: mitt(),
        mediaItem: null,
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
    getters: {
      isVideo() {
        return this.mediaItem && this.mediaItem.type === 'video'
      },
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
        this.mediaItem = playItem

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
          this.mediaBus.emit(MusicEvents.ACTION_PLAY)
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
        this.mediaItem = this.playingList[index]
        this.playingIndex = index
        console.log('[playByIndex]', index, this.mediaItem)
        setTimeout(() => {
          if (this.isPlayEnded) {
            this.mediaBus.emit(MusicEvents.ACTION_PLAY)
            this.isPlayEnded = false
          } else if (this.paused) {
            this.mediaBus.emit(MusicEvents.ACTION_PLAY)
          }
        }, 100)
      },
      reset() {
        this.mediaBus.emit(MusicEvents.ACTION_PAUSE)
        this.mediaItem = null
        this.playingList = []
      },
    },
  })

  return new Store()
}
export const useBusOn = (mediaBus, event: string, fn: any) => {
  onMounted(() => {
    mediaBus.on(event, fn)
  })
  onBeforeUnmount(() => {
    mediaBus.off(event, fn)
  })
}
