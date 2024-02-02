<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import {
  customThemeOptions,
  CustomThemeType,
  ldThemeOptions,
  loopModeMap,
  SettingsTabType,
} from '@/enum/settings'
import {StOptionItem, StOptionType} from '@/components/CommonUI/OptionUI/enum'

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
            !settingsStore.desktopWallpaper && {
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
              selectOptions: ldThemeOptions,
            },
            {
              label: '系统主题',
              key: 'customTheme',
              store: settingsStore,
              type: StOptionType.SELECT,
              selectOptions: customThemeOptions,
            },
            settingsStore.customTheme === CustomThemeType.DEFAULT && {
              label: '圆角样式',
              key: 'enableRoundedTheme',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            settingsStore.customTheme === CustomThemeType.DEFAULT && {
              label: 'Aero 效果',
              key: 'enableAeroTheme',
              store: settingsStore,
              type: StOptionType.SWITCH,
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
        {
          label: '系统 UI',
          key: 'system_ui',
          children: [
            {
              label: '多窗口模式',
              key: 'isWindowed',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '任务栏显示时钟',
              key: 'taskbarShowClock',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '任务栏只显示图标',
              key: 'taskbarIconOnly',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
          ],
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
