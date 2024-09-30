<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {MediaItem, useMusicSettingsStore} from '@/apps/MusicPlayer/utils/music-state'
import {fsWebApi} from '@/api/filesystem'
import {MusicEvents, useBusOn, useMediaStore} from '@/apps/MusicPlayer/utils/media-store'

// interface Props {}
// const props = withDefaults(defineProps<Props>(), {})

const storeId = inject('storeId')
const mediaStore = useMediaStore(storeId.value)

const {t: $t} = useI18n()
const avRef = ref()
const mSettingsStore = useMusicSettingsStore()
const avSrc = ref<string | undefined>()

const play = () => {
  avRef.value.play()
}
const pause = () => {
  avRef.value.pause()
}
const previous = () => {
  mediaStore.playPrev()
}
const next = () => {
  mediaStore.playNext()
}
const togglePlay = () => {
  if (!avRef.value || !avRef.value.src) {
    return
  }
  if (avRef.value.paused) {
    play()
  } else {
    pause()
  }
}
const registerMediaEvents = (av) => {
  // console.log(av)
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', play)
    navigator.mediaSession.setActionHandler('pause', pause)
    // navigator.mediaSession.setActionHandler('seekbackward', previous)
    // navigator.mediaSession.setActionHandler('seekforward', next)
    navigator.mediaSession.setActionHandler('previoustrack', previous)
    navigator.mediaSession.setActionHandler('nexttrack', next)
  }

  av.addEventListener('play', () => {
    mediaStore.paused = false
    mediaStore.isLoadedAutoplay = true
  })

  av.addEventListener('pause', () => {
    mediaStore.paused = true
    mediaStore.isLoadedAutoplay = false
  })

  av.addEventListener('ended', () => {
    mediaStore.handlePlayEnded()
  })

  av.addEventListener('volumechange', () => {
    // console.log(av.volume)
    mSettingsStore.setAudioVolume(av.volume * 100)
  })
  av.addEventListener('ratechange', function () {
    // console.log('[ratechange]', av.playbackRate)
    mediaStore.playbackRate = av.playbackRate
  })

  av.addEventListener('canplay', (evt) => {
    // console.log('canplay', av)
    mediaStore.duration = evt.target.duration
    if (mediaStore.isLoadedAutoplay) {
      play()
    }
  })

  av.addEventListener('timeupdate', (evt) => {
    // console.log('timeupdate', evt.target.currentTime)
    mediaStore.currentTime = evt.target.currentTime
  })

  av.addEventListener('error', (error) => {
    console.error(error)
    window.$message.error($t('msg.load-fail-or-no-supported-source'))
  })
}
const changeCurrentTime = (newTime) => {
  avRef.value && (avRef.value.currentTime = newTime)
}
const changeVolume = (val) => {
  avRef.value && (avRef.value.volume = val / 100)
}
const changeSpeed = (val = 1) => {
  if (!avRef.value) {
    return
  }
  try {
    avRef.value.playbackRate = val
  } catch (e: any) {
    window.$message.error(e.message)
  }
}

watch(() => mSettingsStore.audioVolume, changeVolume)
watch(() => mediaStore.playbackRate, changeSpeed)

watch(
  () => mediaStore.mediaItem,
  async (item: MediaItem) => {
    if (!item) {
      avSrc.value = undefined
      return
    }
    avSrc.value = fsWebApi.getStreamShareLink([item.absPath])
    const playbackRate = mediaStore.playbackRate
    avRef.value.load()

    // 由于媒体标签变更src会导致速度重置为1，在此还原设置速度
    setTimeout(() => {
      changeSpeed(playbackRate)
    })
  },
  {immediate: true},
)

watch(
  () => mediaStore.isVideo,
  () => {
    setTimeout(() => {
      changeVolume(mSettingsStore.audioVolume)
      changeSpeed(mediaStore.playbackRate)
      registerMediaEvents(avRef.value)
    })
  },
  {immediate: true},
)

useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_TOGGLE_PLAY, togglePlay)
useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_PLAY, play)
useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_PAUSE, pause)
useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_CHANGE_CURRENT_TIME, changeCurrentTime)

onBeforeUnmount(() => {})
</script>

<template>
  <div class="player-core">
    <video v-if="mediaStore.isVideo" ref="avRef" :src="avSrc" controls></video>
    <audio v-else ref="avRef" :src="avSrc" controls></audio>
  </div>
</template>

<style lang="scss" scoped>
.player-core {
  height: 100%;
  width: 100%;
  video {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
