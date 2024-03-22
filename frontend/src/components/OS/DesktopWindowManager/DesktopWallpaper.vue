<script setup lang="ts">
import {useSettingsStore} from '@/store/settings'
import {useSystemStore} from '@/store/system'
import {useDropZone, useStorage} from '@vueuse/core'
import {blobToBase64} from '@/utils'
import {LsKeys} from '@/enum'

const settingsStore = useSettingsStore()
const systemStore = useSystemStore()
const wallpaperBase64 = useStorage(LsKeys.WALLPAPER_STORAGE, '')

const bgStyle = computed(() => {
  const s: any = {}
  if (wallpaperBase64.value && settingsStore.desktopWallpaper === 'file') {
    s.backgroundImage = `url(${wallpaperBase64.value})`
  } else if (settingsStore.desktopWallpaper) {
    s.backgroundImage = `url(${settingsStore.desktopWallpaper})`
  }
  if (settingsStore.desktopBgColor) {
    s.backgroundColor = settingsStore.desktopBgColor
  }
  return s
})

watch(
  () => settingsStore.desktopWallpaper,
  (val) => {
    // 如果用户修改了这个值，就清除上传的壁纸
    if (val !== 'file') {
      wallpaperBase64.value = ''
    }
  },
)

async function onDrop(files: File[] | null) {
  if (files && files[0]) {
    // 使用file字符串判断用户上传了图片作为背景
    settingsStore.desktopWallpaper = 'file'
    wallpaperBase64.value = await blobToBase64(files[0])
  }
}
const dropZoneRef = ref<HTMLDivElement>()

const {isOverDropZone} = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: (types) => {
    // console.log(types)
    if (types && types[0]) {
      const typeFirst = types[0].split('/')[0]
      if (typeFirst === 'image') {
        return true
      }
    }
    return false
  },
})
</script>

<template>
  <div ref="dropZoneRef" :class="{isOverDropZone}" class="desktop-wallpaper" :style="bgStyle">
    <slot></slot>

    <span class="watermark-tip font-code">{{
      `${!systemStore.isBackendAvailable ? '服务器离线模式' : '开发模式'}`
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.desktop-wallpaper {
  //background-color: #3a6ea5;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.7);

  &.isOverDropZone {
    outline: 2px dashed $primary;
    outline-offset: -3px;
  }

  .watermark-tip {
    position: absolute;
    bottom: 38px;
    right: 8px;
    text-shadow: none;
    white-space: break-spaces;
    text-align: right;
  }
}
</style>
