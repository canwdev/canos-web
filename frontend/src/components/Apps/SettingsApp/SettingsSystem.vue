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
import {getServerInfo} from '@/api/server'
import pkg from '../../../../package.json'

export default defineComponent({
  name: 'SettingsSystem',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()
    const settingsStore = useSettingsStore()
    const serverInfo = ref<any>({})

    onMounted(async () => {
      const res = await getServerInfo()
      serverInfo.value = res || {}
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
              subtitle: serverInfo.value.name,
              actionRender: h('div', serverInfo.value.version),
            },
            {
              key: 'github',
              label: '仓库地址',
              subtitle: `作者: ${serverInfo.value.author}`,
              actionRender: h(
                'a',
                {
                  href: serverInfo.value.repository,
                  target: '_blank',
                  rel: 'nofollow noopener',
                },
                'Github'
              ),
            },
          ],
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
