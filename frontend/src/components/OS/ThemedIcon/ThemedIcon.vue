<script lang="ts" setup>
import {useSettingsStore} from '@/store/settings'
import {ICON_BASE_URL, useIconThemes, useThemedIcon} from './use-icon-themes'
import {isSrcHttpUrl} from '@/utils/is'

interface Props {
  name: string
  subName?: string
  ext?: string
}

const props = withDefaults(defineProps<Props>(), {})
const {name, subName, ext} = toRefs(props)

const {getIconPath} = useThemedIcon()

const iconSrc = computed(() => {
  return getIconPath(name.value, ext.value)
})

const subIconSrc = computed(() => {
  if (!subName.value) {
    return null
  }
  return getIconPath(subName.value, ext.value)
})
</script>

<template>
  <div class="themed-icon">
    <img class="themed-icon-img" :src="iconSrc" :alt="name" />
    <img v-if="subIconSrc" class="themed-icon-sub-img" :src="subIconSrc" :alt="subName" />
  </div>
</template>

<style lang="scss" scoped>
.themed-icon {
  display: inline-flex;
  position: relative;
  .themed-icon-img {
    width: 100%;
    height: 100%;
  }
  .themed-icon-sub-img {
    width: 38%;
    height: 38%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
