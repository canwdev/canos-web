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
  <div class="tray-icon battery-icon-wrap" :title="titleDisplay">
    <span>{{ (level * 100).toFixed(0) }}%</span>
    <span v-if="charging">🗲</span>
  </div>
</template>

<style lang="scss" scoped>
.battery-icon-wrap {
  position: relative;
  border: 1px solid currentColor;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
