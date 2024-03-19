<script setup lang="ts">
import musicBus, {MusicEvents, useMusicBusOn} from '@/apps/MusicPlayer/utils/bus'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import {MusicItem, useMusicStore} from '@/apps/MusicPlayer/utils/music-state'
import {fsWebApi} from '@/api/filesystem'

// interface Props {}
// const props = withDefaults(defineProps<Props>(), {})

const musicStore = useMusicStore()

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
  () => musicStore.musicItem,
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
  registerAudioEvents(audioRef.value)
  changeVolume(settingsStore.audioVolume)
  changeSpeed(musicStore.playbackRate)
})

useMusicBusOn(MusicEvents.ACTION_TOGGLE_PLAY, togglePlay)
useMusicBusOn(MusicEvents.ACTION_PLAY, play)
useMusicBusOn(MusicEvents.ACTION_PAUSE, pause)
useMusicBusOn(MusicEvents.ACTION_CHANGE_CURRENT_TIME, changeCurrentTime)

onBeforeUnmount(() => {})
</script>

<template>
  <div class="player-core">
    <audio ref="audioRef" :src="audioSrc" controls></audio>
  </div>
</template>
