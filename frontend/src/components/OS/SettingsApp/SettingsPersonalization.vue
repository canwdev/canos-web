<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {ldThemeOptions, SettingsTabType} from '@/enum/settings'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import {useThemeOptions} from '@/components/CanUI/packages/ViewPortWindow/utils/use-theme'
import {useIconThemes} from '@/components/OS/ThemedIcon/use-icon-themes'

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

export default defineComponent({
  name: 'SettingsPersonalization',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()
    const settingsStore = useSettingsStore()
    const {themeOptions} = useThemeOptions()
    const {iconOptions} = useIconThemes()

    const optionList = computed((): StOptionItem[] => {
      return [
        {
          label: '个性化',
          key: 'personalization',
          children: [
            {
              label: '主题色',
              key: 'themeColor',
              store: settingsStore,
              type: StOptionType.COLOR_PICKER,
            },
            {
              label: '桌面壁纸',
              key: 'desktopWallpaper',
              store: settingsStore,
              type: StOptionType.INPUT,
              tips: getWallpaperText(),
              placeholder: 'optional',
            },
            {
              label: '桌面背景色',
              key: 'desktopBgColor',
              store: settingsStore,
              type: StOptionType.COLOR_PICKER,
            },
            {
              label: '明暗模式',
              key: 'ldTheme',
              store: settingsStore,
              type: StOptionType.MULTIPLE_SWITCH,
              options: ldThemeOptions,
            },
            {
              label: '系统主题',
              key: 'customTheme',
              store: settingsStore,
              type: StOptionType.SELECT,
              options: themeOptions.value,
            },
            {
              label: '图标主题',
              key: 'iconTheme',
              store: settingsStore,
              type: StOptionType.SELECT,
              options: iconOptions.value,
            },
            {
              label: 'Disable Animation',
              subtitle: 'E-Ink optimization',
              key: 'disableAnimation',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
          ].filter(Boolean),
        },
      ]
    })

    return {
      optionList,
    }
  },
})
</script>

<template>
  <OptionUI :option-list="optionList" />
</template>
