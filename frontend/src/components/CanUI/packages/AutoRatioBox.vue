<script>
/* 自动计算长宽比的盒子 */
export default {
  name: 'AutoRatioBox',
  props: {
    width: {
      type: [Number, String],
      default: 1,
    },
    height: {
      type: [Number, String],
      default: 1,
    },
    ratio: {
      type: [Number, String],
      default: null,
    },
    // 根据高度自适应宽度
    isY: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mRatio() {
      if (this.ratio) {
        return Number(this.ratio)
      }
      return Number(this.height) / Number(this.width)
    },
    percent() {
      return (this.mRatio * 100).toFixed(2)
    },
  },
}
</script>

<template>
  <div class="auto-ratio-box" :class="{'_max-height': isY}" :data-ratio="ratio">
    <svg v-if="isY" class="__height-box" :viewBox="`0 0 100 ${percent}`"></svg>
    <div v-else-if="!disable" class="__height-box" :style="{paddingBottom: `${percent}%`}"></div>

    <div class="__box-content" :class="{_disable: disable}">
      <slot> </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auto-ratio-box {
  position: relative;
  width: 100%;
  background-position: center;
  background-size: cover;

  &._max-height {
    width: fit-content;
    height: 100%;

    .__height-box {
      height: 100%;
    }
  }

  .__box-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &._disable {
      position: unset;
      top: unset;
      left: unset;
      right: unset;
      bottom: unset;
    }
  }
}
</style>
