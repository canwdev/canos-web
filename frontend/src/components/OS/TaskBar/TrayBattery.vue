<script lang="ts" setup>
import {useBattery} from '@vueuse/core'
import moment from 'moment/moment'

const {charging, chargingTime, dischargingTime, level} = useBattery()

const formatTime = (seconds) => {
  return moment.duration(seconds, 'seconds').format('HH:mm:ss', {
    trim: false,
  })
}

const titleDisplay = computed(() => {
  let title = `Battery: ${level.value * 100}%`
  if (charging.value) {
    title += ' (Charging)'
    title += `\nchargingTime: ${formatTime(chargingTime.value)}`
  } else {
    title += `\ndischargingTime: ${formatTime(dischargingTime.value)}`
  }
  return title
})
</script>

<template>
  <div class="battery-icon-wrap" :title="titleDisplay">
    <div class="battery-icon">
      <span>{{ (level * 100).toFixed(0) }}%</span>
      <span v-if="charging" class="mdi mdi-lightning-bolt"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.battery-icon {
  position: relative;
  border: 1px solid currentColor;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
