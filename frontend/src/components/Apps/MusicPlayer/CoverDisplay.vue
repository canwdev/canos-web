<script>
export default {
  name: 'CoverDisplay',
  props: {
    src: {
      type: String,
      default: null,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    isRotating: {
      type: Boolean,
      default: false,
    },
    isShowIcon: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<template>
  <div class="cover-display">
    <img v-if="src" :src="src" :class="{rounded: isRounded, rotating: isRotating}" />
    <span v-else-if="isShowIcon" class="material-icons">audiotrack</span>
  </div>
</template>

<style lang="scss" scoped>
.cover-display {
  position: relative;
  overflow: hidden;
  display: flex;

  .material-icons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10rem;
  }

  img {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: rotating360 60s infinite linear;
    animation-play-state: paused;
    border-radius: inherit;
    overflow: hidden;

    &.rounded {
      border-radius: 50%;
    }
    &.rotating {
      animation-play-state: running;
    }
  }
}
</style>
