<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import {ldThemeOptions, SettingsTabType} from '@/enum/settings'
import {StOptionItem, StOptionType} from '@/components/CommonUI/OptionUI/enum'
import pkg from '../../../../package.json'
import {useSystemStore} from '@/store/system'
import {loopModeMap} from '@/apps/MusicPlayer/utils/music-state'

export default defineComponent({
  name: 'SettingsSystem',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()
    const settingsStore = useSettingsStore()
    const systemStore = useSystemStore()

    const optionList = computed((): StOptionItem[] => {
      return [
        {
          label: '系统信息',
          key: 'os_info',
          children: [
            {
              key: 'frontend_version',
              label: '前端版本',
              subtitle: pkg.name,
              actionRender: h('div', pkg.version),
            },
            {
              key: 'backend_version',
              label: '后端服务器版本',
              subtitle: systemStore.isBackendAvailable
                ? systemStore.serverInfo.name
                : '后端服务不可用',
              actionRender: h(
                'div',
                systemStore.isBackendAvailable ? systemStore.serverInfo.version : 'N/A',
              ),
            },
            {
              key: 'github',
              label: '仓库地址',
              subtitle: `作者: Canwdev`,
              actionRender: h(
                'a',
                {
                  href: 'https://github.com/canwdev/canos-web',
                  target: '_blank',
                  rel: 'nofollow noopener',
                },
                'Github',
              ),
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
              label: '任务栏只显示图标',
              key: 'taskbarIconOnly',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '托盘：FPS',
              key: 'taskbarShowFps',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '托盘：内存',
              key: 'taskbarShowMemory',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '托盘：网络',
              key: 'taskbarShowNetwork',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '托盘：电池',
              key: 'taskbarShowBattery',
              store: settingsStore,
              type: StOptionType.SWITCH,
            },
            {
              label: '托盘：时钟',
              key: 'taskbarShowClock',
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
