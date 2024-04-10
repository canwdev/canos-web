<script lang="ts" setup>
import {useSettingsStore} from '@/store/settings'
import {ICON_BASE_URL, useIconThemes, useThemedIcon} from './use-icon-themes'
import {isSrcHttpUrl} from '@/utils/is'

interface Props {
  name: string
  ext?: string
}

const props = withDefaults(defineProps<Props>(), {})
const {name, ext} = toRefs(props)

const {getIconPath} = useThemedIcon()
const iconSrc = computed(() => {
  return getIconPath(name.value, ext.value)
})
</script>

<template>
  <img class="themed-icon" :src="iconSrc" />
</template>
