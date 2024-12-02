<script lang="ts" setup>
import {useSettingsStore} from '@/store/settings'
import {ICON_BASE_URL, useIconThemes, useThemedIcon} from './use-icon-themes'
import {isSrcHttpUrl} from '@/utils/is'

interface Props {
  name?: string
  subName?: string
  iconClass?: string
  ext?: string
}

const props = withDefaults(defineProps<Props>(), {})
const {name, subName, ext} = toRefs(props)

const {getIconPath} = useThemedIcon()

const isFallback = ref(false)

const iconSrc = computed(() => {
  if (!name.value) {
    return null
  }
  return getIconPath(name.value, ext.value, isFallback.value)
})

const subIconSrc = computed(() => {
  if (!subName.value) {
    return null
  }
  return getIconPath(subName.value, ext.value, isFallback.value)
})
</script>

<template>
  <div class="themed-icon">
    <img
      v-if="iconSrc"
      class="themed-icon-img"
      :src="iconSrc"
      :alt="name"
      @error="isFallback = true"
    />
    <img
      v-if="subIconSrc"
      class="themed-icon-sub-img"
      :src="subIconSrc"
      :alt="subName"
      @error="isFallback = true"
    />
    <span v-if="iconClass" class="themed-icon-class" :class="iconClass" />
  </div>
</template>

<style lang="scss" scoped>
.themed-icon {
  display: inline-flex;
  align-content: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
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
  .themed-icon-class {
    line-height: 1;
    color: $primary;
  }
}
</style>
