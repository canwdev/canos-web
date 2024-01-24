<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import {StOptionItem} from '@/components/CommonUI/OptionUI/enum'
import {AllAppList} from '@/enum/app'
import {NSpace, NSwitch} from 'naive-ui'

export default defineComponent({
  name: 'SettingsPrograms',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()
    const settingsStore = useSettingsStore()

    const optionList = computed((): StOptionItem[] => {
      const aIdsMap = {}
      settingsStore.appAutoStartIds.forEach((id) => {
        aIdsMap[id] = true
      })
      return [
        {
          label: '应用管理',
          key: 'app_management',
          children: AllAppList.map((item) => {
            return {
              icon: item.icon,
              label: item.title,
              key: item.appid,
              actionRender: h(NSpace, {size: 'small', align: 'center'}, () => [
                h('div', {}, '开机自启'),
                h(NSwitch, {
                  value: aIdsMap[item.appid],
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
