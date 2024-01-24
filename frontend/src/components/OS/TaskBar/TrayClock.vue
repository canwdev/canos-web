<script lang="ts">
import {defineComponent} from 'vue'
import moment from 'moment'

const timeFormat = 'HH:mm:ss<br>ddd YYYY/MM/DD'

export default defineComponent({
  name: 'TrayClock',
  setup() {
    const time = ref('')
    const intervalRef = ref()

    onMounted(() => {
      intervalRef.value = setInterval(() => {
        time.value = moment().format(timeFormat)
      })
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
  padding: 2px 4px;
  text-align: right;
  font-size: 10px;
  line-height: 1.5;
}
</style>
