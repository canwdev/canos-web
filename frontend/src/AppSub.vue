<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppSub',
  setup() {
    window.$message = useMessage()
    window.$notification = useNotification()
    window.$dialog = useDialog()
    window.$loadingBar = useLoadingBar()
  },
})
</script>

<template></template>
