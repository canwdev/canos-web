<script lang="ts" setup>
import {useSettingsStore} from '@/store/settings'
import {ICON_BASE_URL, useIconThemes} from './use-icon-themes'
import {isSrcHttpUrl} from '@/utils/is'

interface Props {
  name: string
  ext?: string
}

const props = withDefaults(defineProps<Props>(), {})
const {name, ext} = toRefs(props)

const settingsStore = useSettingsStore()
const {iconMap} = useIconThemes()

const iconSrc = computed(() => {
  let filename = name.value

  if (isSrcHttpUrl(filename)) {
    return filename
  }

  if (ext.value !== undefined) {
    filename = filename + ext.value
  } else {
    filename = filename + iconMap.value[settingsStore.iconTheme].fileExt
  }

  return `${ICON_BASE_URL}/${settingsStore.iconTheme}/${filename}`
})
</script>

<template>
  <img class="themed-icon" :src="iconSrc" />
</template>
