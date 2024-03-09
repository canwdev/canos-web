<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import {ldThemeOptions, loopModeMap, SettingsTabType} from '@/enum/settings'
import {StOptionItem, StOptionType} from '@/components/CommonUI/OptionUI/enum'
import {getServerInfo} from '@/api/server'
import pkg from '../../../package.json'
import {useSystemStore} from '@/store/system'
import {customThemeOptions, CustomThemeType} from '@/components/CommonUI/ViewPortWindow/enum'

export default defineComponent({
  name: 'SettingsSystem',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()
    const settingsStore = useSettingsStore()
    const systemStore = useSystemStore()
    const serverInfo = ref<any>({})

    onMounted(async () => {
      if (systemStore.isBackendAvailable) {
        const res = await getServerInfo()
        serverInfo.value = res || {}
      }
    })

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
              subtitle: systemStore.isBackendAvailable ? serverInfo.value.name : '后端服务不可用',
              actionRender: h(
                'div',
                systemStore.isBackendAvailable ? serverInfo.value.version : 'N/A'
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
                'Github'
              ),
            },
          ].filter(Boolean),
        },
        {
          label: '媒体设置',
          key: 'media_settings',
          children: [
            {
              label: '音量',
              key: 'audioVolume',
              store: settingsStore,
              type: StOptionType.SLIDER,
              selectOptions: ldThemeOptions,
            },
            {
              label: '播放模式',
              key: 'loopMode',
              store: settingsStore,
              type: StOptionType.SELECT,
              selectOptions: Object.values(loopModeMap).map((i) => ({
                label: $t(i.i18nKey),
                value: i.value,
              })),
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
