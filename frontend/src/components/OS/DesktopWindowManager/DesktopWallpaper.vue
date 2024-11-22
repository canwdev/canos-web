<script setup lang="ts">
import {useSettingsStore} from '@/store/settings'
import {useSystemStore} from '@/store/system'
import {useDropZone, useStorage} from '@vueuse/core'
import {blobToBase64} from '@/utils'
import {LsKeys} from '@/enum'
import {DESKTOP_FILE_FLAG, DesktopBackgroundSize} from '@/enum/settings'

const settingsStore = useSettingsStore()
const systemStore = useSystemStore()
const wallpaperBase64 = useStorage(LsKeys.WALLPAPER_STORAGE, '')

const bgStyle = computed(() => {
  const s: any = {}
  if (wallpaperBase64.value && settingsStore.desktopWallpaper === DESKTOP_FILE_FLAG) {
    s.backgroundImage = `url(${wallpaperBase64.value})`
  } else if (settingsStore.desktopWallpaper) {
    s.backgroundImage = `url(${settingsStore.desktopWallpaper})`
  }
  if (settingsStore.desktopBgColor) {
    s.backgroundColor = settingsStore.desktopBgColor
  }

  switch (settingsStore.desktopBackgroundSize) {
    case DesktopBackgroundSize.COVER:
      s.backgroundSize = 'cover'
      break
    case DesktopBackgroundSize.CONTAIN:
      s.backgroundSize = 'contain'
      break
    case DesktopBackgroundSize.CENTER:
      s.backgroundSize = 'auto'
      s.backgroundPosition = 'center'
      break
    case DesktopBackgroundSize.TILE:
      s.backgroundSize = 'auto'
      s.backgroundPosition = 'left top'
      s.backgroundRepeat = 'repeat'
      break
    case DesktopBackgroundSize.STRETCH:
      s.backgroundSize = '100% 100%'
      break
  }

  return s
})

watch(
  () => settingsStore.desktopWallpaper,
  (val) => {
    // 如果用户修改了这个值，就清除上传的壁纸
    if (val !== DESKTOP_FILE_FLAG) {
      wallpaperBase64.value = ''
    }
  },
)

// async function onDrop(files: File[] | null) {
//   if (files && files[0]) {
//     // 使用file字符串判断用户上传了图片作为背景
//     settingsStore.desktopWallpaper = DESKTOP_FILE_FLAG
//     wallpaperBase64.value = await blobToBase64(files[0])
//   }
// }
const dropZoneRef = ref<HTMLDivElement>()
const isOverDropZone = ref(false)
// const {isOverDropZone} = useDropZone(dropZoneRef, {
//   onDrop,
//   dataTypes: (types) => {
//     // console.log(types)
//     if (types && types[0]) {
//       const typeFirst = types[0].split('/')[0]
//       if (typeFirst === 'image') {
//         return true
//       }
//     }
//     return false
//   },
// })
</script>

<template>
  <div ref="dropZoneRef" :class="{isOverDropZone}" class="desktop-wallpaper" :style="bgStyle">
    <slot></slot>

    <template v-if="!systemStore.isBackendAvailable">
      <span v-for="i in 4" :key="i" class="watermark-tip font-code" :class="`no-${i}`"
        >服务器离线模式</span
      >
    </template>
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

  &.isOverDropZone {
    outline: 2px dashed $primary;
    outline-offset: -3px;
  }

  .watermark-tip {
    position: absolute;
    white-space: break-spaces;
    text-align: right;
    color: white;
    text-shadow: 1px 1px 1px rgb(0, 0, 0);
    $x: 8px;
    &.no-1 {
      top: $x;
      left: $x;
    }
    &.no-2 {
      top: $x;
      right: $x;
    }
    &.no-3 {
      bottom: $taskbar_height + $x;
      right: $x;
    }
    &.no-4 {
      bottom: $taskbar_height + $x;
      left: $x;
    }
  }
}
</style>
