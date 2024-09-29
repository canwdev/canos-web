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
const audioRef = ref()
const mSettingsStore = useMusicSettingsStore()
const audioSrc = ref<string | undefined>()

const play = () => {
  audioRef.value.play()
}
const pause = () => {
  audioRef.value.pause()
}
const previous = () => {
  mediaStore.playPrev()
}
const next = () => {
  mediaStore.playNext()
}
const togglePlay = () => {
  if (!audioRef.value || !audioRef.value.src) {
    return
  }
  if (audioRef.value.paused) {
    play()
  } else {
    pause()
  }
}
const registerAudioEvents = (audio) => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', play)
    navigator.mediaSession.setActionHandler('pause', pause)
    // navigator.mediaSession.setActionHandler('seekbackward', previous)
    // navigator.mediaSession.setActionHandler('seekforward', next)
    navigator.mediaSession.setActionHandler('previoustrack', previous)
    navigator.mediaSession.setActionHandler('nexttrack', next)
  }

  audio.addEventListener('play', () => {
    mediaStore.paused = false
    mediaStore.isLoadedAutoplay = true
  })

  audio.addEventListener('pause', () => {
    mediaStore.paused = true
    mediaStore.isLoadedAutoplay = false
  })

  audio.addEventListener('ended', () => {
    mediaStore.handlePlayEnded()
  })

  audio.addEventListener('canplay', (evt) => {
    // console.log('canplay', audio)
    mediaStore.duration = evt.target.duration
    if (mediaStore.isLoadedAutoplay) {
      play()
    }
  })

  audio.addEventListener('timeupdate', (evt) => {
    // console.log('timeupdate', evt.target.currentTime)
    mediaStore.currentTime = evt.target.currentTime
  })

  audio.addEventListener('error', (error) => {
    console.error(error)
    window.$message.error($t('msg.load-fail-or-no-supported-source'))
  })
}
const changeCurrentTime = (newTime) => {
  audioRef.value && (audioRef.value.currentTime = newTime)
}
const changeVolume = (val) => {
  audioRef.value && (audioRef.value.volume = val / 100)
}
const changeSpeed = (val = 1) => {
  if (!audioRef.value) {
    return
  }
  try {
    audioRef.value.playbackRate = val
  } catch (e: any) {
    window.$message.error(e.message)
  }
}

watch(() => mSettingsStore.audioVolume, changeVolume)
watch(() => mediaStore.playbackRate, changeSpeed)

watch(
  () => mediaStore.musicItem,
  async (item: MediaItem) => {
    if (!item) {
      audioSrc.value = undefined
      return
    }
    const {key} = (await fsWebApi.createShareLink({
      paths: [item.absPath],
    })) as unknown as any
    audioSrc.value = fsWebApi.getStreamShareLink(key)
  },
  {immediate: true},
)

onMounted(() => {
  registerAudioEvents(audioRef.value)
  changeVolume(mSettingsStore.audioVolume)
  changeSpeed(mediaStore.playbackRate)
})

useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_TOGGLE_PLAY, togglePlay)
useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_PLAY, play)
useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_PAUSE, pause)
useBusOn(mediaStore.mediaBus, MusicEvents.ACTION_CHANGE_CURRENT_TIME, changeCurrentTime)

onBeforeUnmount(() => {})
</script>

<template>
  <div class="player-core">
    <audio ref="audioRef" :src="audioSrc" controls></audio>
  </div>
</template>
