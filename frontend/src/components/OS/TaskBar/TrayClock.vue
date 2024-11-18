<script lang="ts">
import {defineComponent} from 'vue'
import moment from 'moment/moment'

const timeFormat = 'HH:mm:ss<br>ddd YYYY/MM/DD'

export default defineComponent({
  name: 'TrayClock',
  setup() {
    const time = ref('')
    const intervalRef = ref()

    onMounted(() => {
      let lastSecond = -1 // 用于存储上次打印的秒数
      intervalRef.value = setInterval(() => {
        const now = new Date() // 获取当前时间
        const currentSecond = now.getSeconds() // 获取当前秒数

        // 检查当前秒数是否与上一次不同
        if (currentSecond !== lastSecond) {
          lastSecond = currentSecond // 更新上一次的秒数
          time.value = moment(now).format(timeFormat)
        }
      }, 100) // 每100毫秒检查一次
    })

    onBeforeUnmount(() => {
      clearInterval(intervalRef.value)
    })
    return {
      time,
    }
  },
})
</script>

<template>
  <div class="tray-datetime" v-html="time"></div>
</template>

<style lang="scss" scoped>
.tray-datetime {
  box-sizing: border-box;
  padding: 2px 4px;
  text-align: right;
  font-size: 12px;
  line-height: 1.35;
  font-family: sans-serif;
}
</style>
