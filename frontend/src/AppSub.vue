<script lang="ts" setup>
import {GlobalEvents, useGlobalBusOn} from '@/utils/bus'
import {LsKeys} from '@/enum'
import {useRouter} from 'vue-router'
import {mcUtils} from '@/utils/mc-utils'
import {ElMessage, ElMessageBox} from 'element-plus'

window.$message = ElMessage
window.$dialog = ElMessageBox
// window.$loadingBar = useLoadingBar()
const router = useRouter()

useGlobalBusOn(GlobalEvents.GLOBAL_EVENT_LOGOUT, () => {
  localStorage.removeItem(LsKeys.LS_KEY_AUTHORIZATION)

  router.replace({
    name: 'LoginPage',
    query: {
      redirect: router.currentRoute.value.fullPath,
    },
  })
})

window.$mcUtils = mcUtils
</script>

<template></template>
