<script>
const LS_LIVE2D_HIDDEN = 'LS_LIVE2D_HIDDEN'

export default {
  name: 'Live2D',
  props: {
    width: {
      type: Number,
      default: 160,
    },
    height: {
      type: Number,
      default: 320,
    },
    modelPath: {
      type: String,
      default: '',
    },
    message: {
      type: [Boolean, String, Number],
      default: 'Hello World!',
    },
    showMessage: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    live2dStarted: false,
    hidden: JSON.parse(localStorage.getItem(LS_LIVE2D_HIDDEN)) || false,
  }),
  watch: {
    hidden(nv) {
      if (!nv && !this.live2dStarted) {
        this.startLive2D()
      }
    },
  },

  mounted() {
    setTimeout(() => {
      // 是否自动加载L2D
      if (!this.hidden) {
        this.startLive2D()
      }
    }, 200)
  },
  methods: {
    startLive2D() {
      if (!this.modelPath) {
        console.error('Live2D: 必须提供模型路径(modelPath)！')
        return
      }
      // 启动live2d！
      // eslint-disable-next-line no-undef
      loadlive2d('live2d', this.modelPath)
      this.live2dStarted = true
      console.log('Live2d Started')
    },
    toogleHide() {
      const stat = !this.hidden
      this.hidden = stat
      localStorage.setItem(LS_LIVE2D_HIDDEN, stat)
    },
  },
}
</script>

<template>
  <div :style="{width: width + 'px', height: height + 'px'}" class="live2d-wrap" :class="{hidden}">
    <div class="action-group">
      <button @click="toogleHide">{{ hidden ? '显示Live2D' : '隐藏Live2D' }}</button>
    </div>
    <transition name="bounce">
      <div v-show="showMessage" class="message">{{ message }}</div>
    </transition>
    <canvas
      id="live2d"
      :width="width"
      :height="height + 25"
      class="live2d"
      @click.prevent="$emit('onLive2DClick')"
    ></canvas>
  </div>
</template>

<style lang="scss" scoped>
.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.57, 2.8);
}

.bounce-enter,
.bounce-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

$border_color: rgba(103, 58, 183, 0.4);
$bg_color: rgba(255, 255, 255, 0.6);
$box_shadow_color: rgba(103, 58, 183, 0.3);
$mobile_width: 400px;

.live2d-wrap {
  position: absolute;
  bottom: 0;
  right: 0;
  /* width: 160px; */
  /* height: 320px; */
  //position: relative;
  transition: all time cubic-bezier(0.68, -0.55, 0.27, 1.55);

  @media screen and (max-width: $mobile_width) {
    transform-origin: right bottom;
    transform: scale(0.8);
  }

  &.hidden {
    height: 40px !important;
    pointer-events: none;

    .action-group {
      visibility: visible;
      opacity: 1;
    }

    canvas#live2d,
    .message {
      visibility: hidden;
      opacity: 0;
    }
  }

  &:hover {
    .action-group {
      visibility: visible;
      opacity: 1;
    }
  }

  .action-group {
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 2;
    visibility: hidden;
    opacity: 0;
    pointer-events: visible;
    transition: all time cubic-bezier(0.68, -0.55, 0.27, 1.55);

    & > button {
      font-size: 12px;
      background: $bg_color;
      border: 1px solid $border_color;
      border-radius: 10px;
      padding: 5px 10px;
      outline: none;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 10px $box_shadow_color;
      }
    }
  }

  canvas#live2d {
    cursor: pointer;
    transition: all time cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .message {
    position: absolute;
    bottom: 15%;
    left: 10%;
    right: 10%;
    padding: 5px;
    text-align: center;
    border: 1px solid $border_color;
    border-radius: 12px;
    background-color: $bg_color;
    box-shadow: 0 3px 10px 2px $box_shadow_color;
    font-size: 10px;
    pointer-events: none;
    z-index: 2;
  }

  @media screen and (max-width: $mobile_width) {
    opacity: 0.99;
    transform-origin: right bottom;
  }
}

/*  */
</style>
