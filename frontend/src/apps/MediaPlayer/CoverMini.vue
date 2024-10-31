<script setup lang="ts">
import CoverDisplay from '@/apps/MediaPlayer/CoverDisplay.vue'

interface Props {
  src?: string
  isVideo?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <button class="btn-no-style btn-cover flex items-center justify-center">
    <slot></slot>
    <CoverDisplay v-if="src" :src="src" />
    <i v-else class="icon-wrap mdi" :class="[isVideo ? 'mdi-video-outline' : 'mdi-music-note']"></i>
  </button>
</template>

<style lang="scss" scoped>
.btn-cover {
  width: 50px;
  height: 50px;
  border-radius: 0;
  overflow: hidden;
  .cover-display {
    width: 100%;
    height: 100%;
  }
  .icon-wrap {
    font-size: 24px;
  }
}
</style>
