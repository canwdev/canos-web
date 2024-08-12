<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useSettingsStore} from '@/store/settings'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import {useSystemStore} from '@/store/system'
import {useDevicePixelRatio, useDevicesList} from '@vueuse/core'

export default defineComponent({
  name: 'SettingsHardware',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()

    const {devices} = useDevicesList()
    const {pixelRatio} = useDevicePixelRatio()

    const optionList = computed((): StOptionItem[] => {
      const valueRender = (val) => {
        return h('input', {
          class: 'font-code vp-input',
          style: 'max-width: 100px;',
          value: val,
          readonly: true,
        })
      }
      return [
        {
          label: '设备管理器',
          key: 'devmgmt.msc',
          children: [
            {
              label: 'Device Pixel Ratio',
              key: 'pixelRatio',
              actionRender: valueRender(`${pixelRatio.value || 'N/A'}`),
            },
            {
              label: 'Devices',
              key: 'devices',
              actionRender: h(
                'button',
                {
                  class: 'vp-button',
                  onClick: () => {
                    console.log(devices.value)
                  },
                },
                'Print to Console',
              ),
            },
            ...Array.from(devices.value).map((i) => {
              return {
                label: i.label || '/',
                subtitle: i.kind,
                actionRender: [
                  valueRender(`deviceId: ${i.deviceId || '/'}`),
                  valueRender(`groupId: ${i.groupId || '/'}`),
                ],
              }
            }),
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
