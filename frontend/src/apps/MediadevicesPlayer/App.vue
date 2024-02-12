<script lang="ts">
import {defineComponent} from 'vue'
import WebMediadevicesPlayer from 'web-mediadevices-player/src/App.vue'

export default defineComponent({
  name: 'MediadevicesPlayer',
  components: {
    WebMediadevicesPlayer,
  },
})
</script>

<template>
  <WebMediadevicesPlayer />
</template>
