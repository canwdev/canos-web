<script lang="ts">
import {defineComponent} from 'vue'
import {GlobalEvents, useGlobalBusOn} from '@/utils/bus'
import {LsKeys} from '@/enum'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'AppSub',
  setup() {
    window.$message = useMessage()
    window.$notification = useNotification()
    window.$dialog = useDialog()
    window.$loadingBar = useLoadingBar()
    const router = useRouter()

    useGlobalBusOn(GlobalEvents.GLOBAL_EVENT_LOGOUT, () => {
      localStorage.removeItem(LsKeys.LS_KEY_AUTHORIZATION)

      router.replace({
        name: 'LoginPage',
      })
    })
  },
})
</script>

<template></template>
