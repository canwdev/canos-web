<script lang="ts" setup>
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {
  DESKTOP_FILE_FLAG,
  desktopBackgroundSizeOptions,
  ldThemeOptions,
  SettingsTabType,
} from '@/enum/settings'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import {useThemeOptions} from '@/components/CanUI/packages/ViewPortWindow/utils/use-theme'
import {useIconThemes} from '@/components/OS/ThemedIcon/use-icon-themes'
import {handleReadSelectedFile} from '@/utils/mc-utils/io'
import {useStorage} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {blobToBase64} from '@/utils'

const getWallpaperText = () => {
  const list = [
    {label: 'Bing', url: 'https://api.dujin.org/bing/1920.php'},
    {label: 'ACG', url: 'https://api.dujin.org/pic/'},
    {label: 'Ghibli', url: 'https://api.dujin.org/pic/ghibli'},
    {label: '风景', url: 'https://api.dujin.org/pic/fengjing'},
  ]
  let tpl = `<b><a href="https://www.dujin.org/12142.html" target="_blank">随机壁纸API</a></b>`

  list.forEach((item) => {
    tpl += `<br>${item.label}: <a href="${item.url}" target="_blank">${item.url}</a>`
  })

  return tpl
}

const {t: $t} = useI18n()
const settingsStore = useSettingsStore()
const {themeOptions} = useThemeOptions()
const {iconOptions} = useIconThemes()
const wallpaperBase64 = useStorage(LsKeys.WALLPAPER_STORAGE, '')

const optionList = computed((): StOptionItem[] => {
  return [
    {
      label: '个性化',
      key: 'personalization',
      children: [
        {
          label: '主题色',
          key: 'themeColor',
          iconClass: 'mdi mdi-palette',
          store: settingsStore,
          type: StOptionType.COLOR_PICKER,
        },
        {
          label: '桌面壁纸',
          key: 'desktopWallpaper',
          iconClass: 'mdi mdi-wallpaper',
          store: settingsStore,
          type:
            settingsStore.desktopWallpaper === DESKTOP_FILE_FLAG ? undefined : StOptionType.INPUT,
          tips: getWallpaperText(),
          placeholder: 'optional',
          actionRender: () => {
            return h(
              'div',
              {class: 'flex-row-center-gap'},
              [
                h(
                  'button',
                  {
                    class: 'vp-button',
                    async onClick() {
                      const [handle] = await window.showOpenFilePicker({
                        types: [
                          {
                            description: 'Image',
                            accept: {
                              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
                            },
                          },
                        ],
                      })
                      const file = await handle.getFile()
                      settingsStore.desktopWallpaper = DESKTOP_FILE_FLAG
                      wallpaperBase64.value = await blobToBase64(file)
                    },
                  },
                  'Open...',
                ),
                settingsStore.desktopWallpaper === DESKTOP_FILE_FLAG &&
                  h(
                    'button',
                    {
                      class: 'vp-button',
                      onClick() {
                        settingsStore.desktopWallpaper = ''
                      },
                    },
                    'Clear',
                  ),
              ].filter(Boolean),
            )
          },
        },
        settingsStore.desktopWallpaper && {
          label: '壁纸尺寸',
          key: 'desktopBackgroundSize',
          iconClass: 'mdi mdi-image-size-select-large',
          store: settingsStore,
          type: StOptionType.SELECT,
          options: desktopBackgroundSizeOptions,
        },
        {
          label: '桌面背景色',
          key: 'desktopBgColor',
          iconClass: 'mdi mdi-format-color-fill',
          store: settingsStore,
          type: StOptionType.COLOR_PICKER,
        },
        {
          label: '明暗模式',
          key: 'ldTheme',
          iconClass: 'mdi mdi-brightness-4',
          store: settingsStore,
          type: StOptionType.MULTIPLE_SWITCH,
          options: ldThemeOptions,
        },
        {
          label: '系统主题',
          key: 'customTheme',
          iconClass: 'mdi mdi-palette-swatch-variant',
          store: settingsStore,
          type: StOptionType.SELECT,
          options: themeOptions.value,
        },
        {
          label: '图标主题',
          key: 'iconTheme',
          iconClass: 'mdi mdi-star-box',
          store: settingsStore,
          type: StOptionType.SELECT,
          options: iconOptions.value,
        },
        {
          label: 'Disable Animation',
          subtitle: 'E-Ink optimization',
          key: 'disableAnimation',
          iconClass: 'mdi mdi-transition',
          store: settingsStore,
          type: StOptionType.SWITCH,
        },
      ].filter(Boolean),
    },
  ]
})
</script>

<template>
  <OptionUI :option-list="optionList" />
</template>
