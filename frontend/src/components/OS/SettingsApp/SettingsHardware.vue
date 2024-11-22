<script lang="ts">
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import {StOptionItem, StOptionType} from '@/components/CanUI/packages/OptionUI/enum'
import {useBattery, useDevicePixelRatio, useDevicesList, useNetwork} from '@vueuse/core'
import moment from 'moment/moment'
import {useSystemStore} from '@/store/system'

export default defineComponent({
  name: 'SettingsHardware',
  components: {OptionUI},
  setup(props, {emit}) {
    const {t: $t} = useI18n()

    const systemStore = useSystemStore()
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
        systemStore.isBackendAvailable && {
          label: '后端',
          key: 'server',
          children: [
            {
              label: '服务器系统信息',
              key: 'hostname',
              iconClass: 'mdi mdi-desktop-classic',
              actionRender() {
                return valueRender(`Hostname: ${systemStore.serverInfo!.os.hostname}
Platform: ${systemStore.serverInfo!.os.platform} | Arch: ${systemStore.serverInfo!.os.arch}
OS: ${systemStore.serverInfo!.os.type} | ${systemStore.serverInfo!.os.version} | ${systemStore.serverInfo!.os.release}
CPU: ${systemStore.serverInfo!.os.cpu}
`)
              },
            },
          ],
        },
        {
          label: '前端设备信息',
          key: 'frontend',
          children: [
            {
              label: '浏览器网络',
              key: 'lan',
              iconClass: 'mdi mdi-lan',
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
              key: 'battery',
              iconClass: 'mdi mdi-battery',
              actionRender() {
                return h('div', {
                  style: 'text-align: right',
                  innerHTML: batteryInfo,
                })
              },
            },
            {
              label: '设备像素比',
              key: 'pixelRatio',
              iconClass: 'mdi mdi-monitor-screenshot',
              actionRender() {
                return h('div', {
                  innerHTML: `${pixelRatio.value || 'N/A'}`,
                })
              },
            },
          ],
        },

        {
          label: '前端多媒体设备',
          key: 'devmgmt.msc',
          children: [
            {
              label: 'Devices',
              key: 'devices',
              iconClass: 'mdi mdi-memory',
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
                key: i.devicecId,
                iconClass: 'mdi mdi-chip',
                subtitle: i.kind,
                actionRender: valueRender(`deviceId: ${i.deviceId || '/'}
groupId: ${i.groupId || '/'}`),
              }
            }),
          ],
        },
      ].filter(Boolean) as StOptionItem[]
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
