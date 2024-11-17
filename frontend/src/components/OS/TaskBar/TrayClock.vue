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
      intervalRef.value = setInterval(() => {
        time.value = moment().format(timeFormat)
      }, 1000)
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
