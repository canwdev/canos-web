<script lang="ts" setup>
import {useBattery} from '@vueuse/core'
import {
  BatteryCharge20Filled,
  Battery1020Regular,
  Battery920Regular,
  Battery820Regular,
  Battery720Regular,
  Battery620Regular,
  Battery520Regular,
  Battery420Regular,
  Battery320Regular,
  Battery220Regular,
  Battery120Regular,
  Battery020Regular,
} from '@vicons/fluent'
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
    <!--    <span v-if="charging" class="i-charging" title="🗲">+</span>-->
    <BatteryCharge20Filled v-if="charging" />
    <Battery1020Regular v-else-if="level >= 0.9" />
    <Battery920Regular v-else-if="level >= 0.8" />
    <Battery820Regular v-else-if="level >= 0.7" />
    <Battery720Regular v-else-if="level >= 0.6" />
    <Battery620Regular v-else-if="level >= 0.5" />
    <Battery520Regular v-else-if="level >= 0.4" />
    <Battery420Regular v-else-if="level >= 0.3" />
    <Battery320Regular v-else-if="level >= 0.2" />
    <Battery220Regular v-else-if="level >= 0.1" />
    <Battery120Regular v-else-if="level >= 0.05" />
    <Battery020Regular v-else />
  </div>
</template>

<style lang="scss" scoped>
.battery-icon-wrap {
  position: relative;
  .i-charging {
    left: -2px;
    bottom: -2px;
    font-size: 12px;
    position: absolute;
    color: black;
    font-weight: bolder;
    text-shadow:
      1px 1px white,
      -1px -1px white,
      1px -1px white,
      -1px 1px white;
  }
}
</style>
