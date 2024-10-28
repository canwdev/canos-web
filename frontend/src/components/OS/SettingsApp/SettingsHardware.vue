<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import {useBattery, useDevicePixelRatio, useDevicesList, useNetwork} from '@vueuse/core'
import moment from 'moment/moment'

export default defineComponent({
  name: 'SettingsHardware',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()

    const {devices} = useDevicesList()
    const {pixelRatio} = useDevicePixelRatio()

    const {isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type} = useNetwork()
    const {charging, chargingTime, dischargingTime, level} = useBattery()
    const formatTime = (seconds) => {
      return moment.duration(seconds, 'seconds').format('HH:mm:ss', {
        trim: false,
      })
    }

    const valueRender = (val) => {
      return h('textarea', {
        style: 'width: 300px; height: 100px; font-size: 12px;',
        class: 'font-code vp-input',
        readonly: true,
        value: val,
      })
    }
    const optionList = computed((): StOptionItem[] => {
      let batteryInfo = `电量 ${level.value * 100}%`
      if (charging.value) {
        batteryInfo += ' (充电中)'
        batteryInfo += `<br>充电完成时间: ${formatTime(chargingTime.value)}`
      } else {
        batteryInfo += `<br>剩余可用时间: ${formatTime(dischargingTime.value)}`
      }
      return [
        {
          label: '通用',
          key: 'common',
          children: [
            {
              label: '网络信息',
              actionRender() {
                return valueRender(`Is Online: ${isOnline.value}
Offline At: ${offlineAt.value}
Downlink: ${downlink.value}
Downlink Max: ${downlinkMax.value}
Effective Type: ${effectiveType.value}
Save Data: ${saveData.value}
Type: ${type.value}`)
              },
            },
            {
              label: '电池',
              actionRender() {
                return h('div', {
                  style: 'text-align: right',
                  innerHTML: batteryInfo,
                })
              },
            },
            {
              label: 'Device Pixel Ratio',
              key: 'pixelRatio',
              actionRender() {
                return h('div', {
                  innerHTML: `${pixelRatio.value || 'N/A'}`,
                })
              },
            },
          ],
        },

        {
          label: '多媒体设备',
          key: 'devmgmt.msc',
          children: [
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
                actionRender: valueRender(`deviceId: ${i.deviceId || '/'}
groupId: ${i.groupId || '/'}`),
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
