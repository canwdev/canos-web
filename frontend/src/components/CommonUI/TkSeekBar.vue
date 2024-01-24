<script>
export default {
  name: 'TkSeekbar',
  props: {
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    value: {
      type: [Number, String],
      default: 100,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    wheel: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'focus', 'blur', 'change'],
  computed: {
    progress() {
      return ((this.value / this.max) * 100).toFixed(1)
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    },
    handleFocus(event) {
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handleWheel(event) {
      if (this.wheel) {
        event.preventDefault()
        const el = this.$refs.seekBar
        const deltaY = event.deltaY || 0

        const num = Math.abs(deltaY) / 64

        if (deltaY > 0) {
          el.value = this.value - num
        } else if (deltaY < 0) {
          el.value = this.value + num
        }
        this.$emit('input', el.value)
      }
    },
  },
}
</script>

<template>
  <div class="tk-seekbar" :class="{vertical}">
    <div v-if="!vertical" class="seekbar-fill" :style="'width:' + progress + '%'"></div>
    <input
      ref="seekBar"
      type="range"
      :min="min"
      :max="max"
      :value="value"
      class="common-seekbar seekbar-input"
      v-bind="$attrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @wheel="handleWheel"
    />
  </div>
</template>

<style lang="scss" scoped>
.tk-seekbar {
  height: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;

  $bar_height: 3px;

  &.vertical {
    input {
      writing-mode: bt-lr; /* IE */
      -webkit-appearance: slider-vertical; /* WebKit */
      height: 100%;
      outline: none;
    }
  }

  .seekbar-fill {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: $bar_height;
    width: 0;
    background: $primary;
    user-select: none;
    pointer-events: none;
    z-index: 1;
    border-radius: 2px;
  }

  input {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    appearance: none;
    height: $bar_height;
    background: $color_border;
    outline: none;
    border-radius: 2px;
    box-shadow: none;
    margin: 0;

    @mixin mixin-thumb {
      position: relative;
      appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $primary;
      z-index: 10;
      border: none;
      //box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      @include mixin-thumb;
      margin: 0;
      opacity: 0;
      transition: all 0.3s;
    }

    &:hover {
      &::-webkit-slider-thumb {
        opacity: 1;
      }
    }

    &::-moz-range-thumb {
      @include mixin-thumb;
    }
  }
}
</style>
