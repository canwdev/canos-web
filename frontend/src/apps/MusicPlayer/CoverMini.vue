<script>
import CoverDisplay from '@/apps/MusicPlayer/CoverDisplay.vue'

export default {
  name: 'CoverMini',
  components: {
    CoverDisplay,
  },
  props: {
    iconName: {
      type: String,
      default: 'audiotrack', // headset
    },
    src: {
      type: String,
      default: null,
    },
  },
}
</script>

<template>
  <button class="btn-no-style btn-cover flex items-center justify-center">
    <slot></slot>
    <CoverDisplay v-if="src" :src="src" />
    <i v-else class="material-icons">{{ iconName }}</i>
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
  .material-icons {
    font-size: 29px;
  }
}
</style>
