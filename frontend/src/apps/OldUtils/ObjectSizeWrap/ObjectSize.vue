<script>
export default {
  name: 'ObjectSize',
  props: {
    size: {
      type: Object,
      default() {
        return {
          x: '100mm',
          y: '100mm',
          z: '50mm',
          radius: '0',
        }
      },
    },
  },
  computed: {
    frontStyle() {
      return {
        width: this.size.x,
        height: this.size.y,
      }
    },
    sideStyle() {
      return {
        width: this.size.z,
        height: this.size.y,
      }
    },
  },
}
</script>

<template>
  <div class="object-wrapper font-code">
    <div class="box" :style="[frontStyle, {borderRadius: size.radius}]">
      <div class="sign sign-top">{{ size.x }}</div>
      <div class="sign sign-left">{{ size.y }}</div>
      <div class="center-text">正面</div>
    </div>
    <div class="middle"></div>
    <div class="box" :style="[sideStyle, {borderRadius: size.radius}]">
      <div class="sign sign-top">{{ size.z }}</div>
      <div class="sign sign-left">{{ size.y }}</div>
      <div class="center-text">侧面</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.object-wrapper {
  .box {
    background: #ccc;
    display: inline-block;
    position: relative;
    box-shadow: 0 0 1px 1px #000 inset;
    transition: all 0.3s;
    font-size: 12px;
    line-height: 1.1;
    color: black;

    .sign-top {
      position: absolute;
      top: 2px;
      left: 50%;
      transform: translateX(-50%);
    }

    .sign-left {
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
    }

    .sign-top,
    .sign-left {
      background-color: white;
      z-index: 2;
      padding: 0 2px;
      border: 1px solid currentColor;
      user-select: all;
    }

    .center-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      opacity: 0.3;
    }
  }

  .middle {
    display: inline-block;
    height: 10px;
    width: 10px;
  }
}
</style>
