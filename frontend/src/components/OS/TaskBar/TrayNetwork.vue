<script lang="ts" setup>
import {Wifi120Regular, WifiOff20Regular} from '@vicons/fluent'
import {useNetwork} from '@vueuse/core'

const {isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type} = useNetwork()
const titleDisplay = computed(() => {
  return `Is Online: ${isOnline.value}
Offline At: ${offlineAt.value}
Downlink: ${downlink.value}
Downlink Max: ${downlinkMax.value}
Effective Type: ${effectiveType.value}
Save Data: ${saveData.value}
Type: ${type.value}
`
})
</script>

<template>
  <div class="tray-icon" :title="titleDisplay">
    <Wifi120Regular v-if="isOnline" />
    <WifiOff20Regular v-else />
  </div>
</template>
