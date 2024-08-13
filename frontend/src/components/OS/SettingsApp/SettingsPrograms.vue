<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {StOptionItem} from '@/components/CanUI/packages/OptionUI/enum'
import {useSystemStore} from '@/store/system'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {ElSwitch} from 'element-plus'

export default defineComponent({
  name: 'SettingsPrograms',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()
    const settingsStore = useSettingsStore()
    const systemStore = useSystemStore()

    const optionList = computed((): StOptionItem[] => {
      const aIdsMap = {}
      settingsStore.appAutoStartIds.forEach((id) => {
        aIdsMap[id] = true
      })
      return [
        {
          label: '应用管理',
          key: 'app_management',
          children: systemStore.allApps.map((item) => {
            return {
              iconRender: h(ThemedIcon, {name: item.icon}),
              label: item.title,
              key: item.appid,
              actionRender: h('div', {style: 'display:flex; align-items: center; gap:8px;'}, [
                h('div', {}, '自启动'),
                h(ElSwitch, {
                  modelValue: aIdsMap[item.appid],
                  onClick: () => {
                    // 切换开机自动启动
                    if (aIdsMap[item.appid]) {
                      delete aIdsMap[item.appid]
                    } else {
                      aIdsMap[item.appid] = true
                    }
                    settingsStore.appAutoStartIds = Object.keys(aIdsMap)
                  },
                }),
              ]),
            }
          }),
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
