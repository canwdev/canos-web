<script setup lang="ts">
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import {MusicItem, MusicStore} from '@/apps/MusicPlayer/utils/music-state'
import {toReactive} from '@vueuse/core'
import {fsWebApi} from '@/api/filesystem'

interface Props {
  musicStore: MusicStore
}

const props = withDefaults(defineProps<Props>(), {})

const musicStore = toReactive(toRefs(props).musicStore)

const {t: $t} = useI18n()
const audioRef = ref()
const settingsStore = useSettingsStore()
const audioSrc = ref<string | undefined>()

const play = () => {
  audioRef.value.play()
}
const pause = () => {
  audioRef.value.pause()
}
const previous = () => {
  musicStore.playPrev()
}
const next = () => {
  musicStore.playNext()
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
    musicStore.paused = false
    musicStore.isLoadedAutoplay = true
  })

  audio.addEventListener('pause', () => {
    musicStore.paused = true
    musicStore.isLoadedAutoplay = false
  })

  audio.addEventListener('ended', () => {
    musicStore.handlePlayEnded()
  })

  audio.addEventListener('canplay', (evt) => {
    // console.log('canplay', audio)
    musicStore.duration = evt.target.duration
    if (musicStore.isLoadedAutoplay) {
      play()
    }
  })

  audio.addEventListener('timeupdate', (evt) => {
    // console.log('timeupdate', evt.target.currentTime)
    musicStore.currentTime = evt.target.currentTime
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

watch(() => settingsStore.audioVolume, changeVolume)
watch(() => musicStore.playbackRate, changeSpeed)

watch(
  musicStore.musicItem,
  async (item: MusicItem) => {
    if (!item) {
      audioSrc.value = undefined
    }
    const {key} = (await fsWebApi.createShareLink({
      paths: [item.absPath],
    })) as unknown as any
    audioSrc.value = fsWebApi.getStreamShareLink(key)
  },
  {immediate: true},
)

onMounted(() => {
  globalEventBus.on(GlobalEvents.ACTION_TOGGLE_PLAY, togglePlay)
  globalEventBus.on(GlobalEvents.ACTION_PLAY, play)
  globalEventBus.on(GlobalEvents.ACTION_PAUSE, pause)
  globalEventBus.on(GlobalEvents.ACTION_CHANGE_CURRENT_TIME, changeCurrentTime)

  registerAudioEvents(audioRef.value)
  changeVolume(settingsStore.audioVolume)
  changeSpeed(musicStore.playbackRate)
})

onBeforeUnmount(() => {
  globalEventBus.off(GlobalEvents.ACTION_TOGGLE_PLAY, togglePlay)
  globalEventBus.off(GlobalEvents.ACTION_PLAY, play)
  globalEventBus.off(GlobalEvents.ACTION_PAUSE, pause)
  globalEventBus.off(GlobalEvents.ACTION_CHANGE_CURRENT_TIME, changeCurrentTime)
})
</script>

<template>
  <div class="player-core">
    <audio ref="audioRef" :src="audioSrc" controls></audio>
  </div>
</template>
