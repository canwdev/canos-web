<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {ldThemeOptions, SettingsTabType} from '@/enum/settings'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import pkg from '../../../../package.json'
import {useSystemStore} from '@/store/system'
import {loopModeMap} from '@/apps/MediaPlayer/utils/music-state'

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
          label: '软件信息',
          key: 'os_info',
          children: [
            {
              key: 'frontend_version',
              label: '前端版本',
              iconClass: 'mdi mdi-application-outline',
              subtitle: pkg.name,
              actionRender: h('div', pkg.version),
            },
            {
              key: 'backend_version',
              label: '后端服务器版本',
              iconClass: 'mdi mdi-server-network',
              subtitle: systemStore.isBackendAvailable
                ? systemStore.serverInfo?.name
                : '后端服务不可用',
              actionRender: h(
                'div',
                systemStore.isBackendAvailable ? systemStore.serverInfo?.version : 'N/A',
              ),
            },
            {
              key: 'github',
              label: '仓库地址',
              iconClass: 'mdi mdi-git',
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
              iconClass: 'mdi mdi-dock-window',
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
              label: '托盘：JS 内存',
              key: 'taskbarShowMemory',
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
