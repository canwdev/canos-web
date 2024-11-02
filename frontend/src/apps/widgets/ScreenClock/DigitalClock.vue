<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import moment from 'moment/moment'
import {useResizeObserver} from '@vueuse/core'

const rootRef = ref()
const fontSize = ref(32)
useResizeObserver(rootRef, (entries) => {
  const entry = entries[0]
  const {width, height} = entry.contentRect
  fontSize.value = width * 0.14
})

moment.locale(navigator.language || 'zh-CN')

const lastDateText = ref('')
const timeout = ref<number | null>(null)
const accTime = ref('')
const accDate = ref('')

const updateTime = () => {
  const dt = new Date()
  accTime.value = moment(dt).format('HH:mm:ss')

  const dateText = moment(dt).format('LL dddd')
  if (dateText !== lastDateText.value) {
    accDate.value = dateText
    lastDateText.value = dateText
  }
}

const timer = (callback: () => void) => {
  const interval = 1000
  let expected = Date.now() + interval

  const step = () => {
    const dt = Date.now() - expected // the drift (positive for overshooting)
    if (dt > interval) {
      console.warn(
        'something really bad happened. Maybe the browser (tab) was inactive?\npossibly special handling to avoid futile "catch up" run',
      )
    }
    callback()
    expected += interval
    timeout.value = setTimeout(step, Math.max(0, interval - dt)) // take into account drift
  }

  timeout.value = setTimeout(step, interval)
}

onMounted(() => {
  updateTime()
  timer(updateTime)
})

onBeforeUnmount(() => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
})
</script>

<template>
  <div ref="rootRef" class="digital-clock-wrapper">
    <div class="clock-centered">
      <h1 :style="{fontSize: `${fontSize}px`}">{{ accTime }}</h1>
      <h2 :style="{fontSize: `${fontSize / 2}px`}">{{ accDate }}</h2>
    </div>
  </div>
</template>

<style lang="scss">
.digital-clock-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
  font-family: sans-serif;
  pointer-events: none;

  .clock-centered {
    overflow: hidden;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    text-align: center;

    h1,
    h2 {
      margin: 0;
    }

    h1 {
      font-size: 23px;
      font-weight: bolder;
      line-height: 1.3;
    }

    h2 {
      font-size: 12px;
      font-weight: normal;
    }
  }
}
</style>
