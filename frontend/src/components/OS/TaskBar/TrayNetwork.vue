<script lang="ts" setup>
import {useNetwork} from '@vueuse/core'

const {isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type} = useNetwork()
const titleDisplay = computed(() => {
  return `Is Online: ${isOnline.value}
Offline At: ${offlineAt.value}
Downlink: ${downlink.value}
Downlink Max: ${downlinkMax.value}
Effective Type: ${effectiveType.value}
Save Data: ${saveData.value}
Type: ${type.value}
`
})
</script>

<template>
  <div class="tray-icon" :title="titleDisplay">
    <svg
      width="20"
      height="20"
      v-if="isOnline"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 20 20"
    >
      <g fill="none">
        <path
          d="M16.832 7.384c.41.409.796.877 1.133 1.365a.5.5 0 0 1-.823.568A8.612 8.612 0 0 0 3.946 8.091c-.348.348-.693.77-1.007 1.222a.5.5 0 0 1-.821-.57c.346-.5.728-.966 1.121-1.36a9.612 9.612 0 0 1 13.593 0zm-2.236 1.973a6.637 6.637 0 0 1 1.194 1.656a.5.5 0 0 1-.89.455a5.643 5.643 0 0 0-1.01-1.404a5.45 5.45 0 0 0-8.716 1.39a.5.5 0 1 1-.892-.452a6.45 6.45 0 0 1 10.315-1.645zm-1.709 2.497c.355.354.647.79.85 1.254a.5.5 0 0 1-.916.401a3.135 3.135 0 0 0-.64-.948a3.033 3.033 0 0 0-4.29 0a3.051 3.051 0 0 0-.631.938a.5.5 0 1 1-.916-.401a4.05 4.05 0 0 1 .84-1.244a4.033 4.033 0 0 1 5.703 0zm-1.924 1.933a1.298 1.298 0 1 1-1.836 1.836a1.298 1.298 0 0 1 1.836-1.836z"
          fill="currentColor"
        ></path>
      </g>
    </svg>

    <svg
      width="20"
      height="20"
      v-else
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 20 20"
    >
      <g fill="none">
        <path
          d="M2.854 2.146a.5.5 0 1 0-.708.708l3.031 3.03a9.628 9.628 0 0 0-1.937 1.5c-.393.393-.775.86-1.121 1.36a.5.5 0 0 0 .821.57A9.02 9.02 0 0 1 3.947 8.09a8.614 8.614 0 0 1 1.964-1.473l1.436 1.436a6.437 6.437 0 0 0-1.871 1.303a6.408 6.408 0 0 0-1.193 1.645a.5.5 0 1 0 .892.452a5.41 5.41 0 0 1 1.008-1.39A5.43 5.43 0 0 1 8.11 8.818l1.855 1.856a4.02 4.02 0 0 0-2.781 1.18a4.05 4.05 0 0 0-.84 1.244a.5.5 0 0 0 .916.4c.155-.355.368-.674.63-.937a3.034 3.034 0 0 1 3.304-.66l1.646 1.647a.497.497 0 0 0 .2.2l4.105 4.106a.5.5 0 0 0 .708-.708l-15-15zm6.75 5.336L10.62 8.5a5.427 5.427 0 0 1 3.27 1.565c.396.396.745.885 1.01 1.404a.5.5 0 0 0 .891-.455a6.635 6.635 0 0 0-1.194-1.656a6.435 6.435 0 0 0-4.994-1.875zM7.135 5.014l.81.81a8.607 8.607 0 0 1 9.197 3.493a.5.5 0 0 0 .823-.568a9.61 9.61 0 0 0-10.83-3.734zm3.828 8.773a1.298 1.298 0 1 1-1.836 1.836a1.298 1.298 0 0 1 1.836-1.836z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  </div>
</template>
