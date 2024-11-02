<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import {useThemeOptions} from '@/components/CanUI/packages/ViewPortWindow/utils/use-theme'
import {useIconThemes} from '@/components/OS/ThemedIcon/use-icon-themes'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {ElCheckbox} from 'element-plus'
import {allWidgetList} from '@/apps/widget-list'

const {t: $t} = useI18n()
const settingsStore = useSettingsStore()
const {themeOptions} = useThemeOptions()
const {iconOptions} = useIconThemes()

const optionList = computed((): StOptionItem[] => {
  const aIdsMap = {}
  settingsStore.enabledWidgetIds.forEach((id) => {
    aIdsMap[id] = true
  })

  return [
    {
      label: 'Widgets',
      key: 'widgets',
      children: allWidgetList.map((item) => {
        return {
          iconRender: h(ThemedIcon, {name: item.icon}),
          label: item.title,
          subtitle: [
            item.appid,
            item.singleInstance && '单例模式',
            item.requireBackend && '需要后端服务',
          ]
            .filter(Boolean)
            .join(' | '),
          key: item.appid,
          actionRender: h('div', {style: 'display:flex; align-items: center; gap:8px;'}, [
            h(ElCheckbox, {
              label: '启用',
              checked: aIdsMap[item.appid],
              onClick: () => {
                // 切换小组件启用
                if (aIdsMap[item.appid]) {
                  delete aIdsMap[item.appid]
                } else {
                  aIdsMap[item.appid] = true
                }
                settingsStore.enabledWidgetIds = Object.keys(aIdsMap)
              },
            }),
          ]),
        }
      }),
    },
  ]
})
</script>

<template>
  <OptionUI :option-list="optionList" />
</template>
