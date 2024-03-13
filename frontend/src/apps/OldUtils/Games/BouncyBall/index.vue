<script lang="ts" setup>
import {useElementSize} from '@vueuse/core'

const ballRef = ref()
const rootRef = ref()

const rootSize = useElementSize(rootRef)
const ballSize = useElementSize(ballRef)
const diff = reactive({
  height: 0,
  width: 0,
})

const itv = ref()

const setBounce = () => {
  let ys = 0
  let yv = 2

  let xs = 0
  let xv = 2

  clearInterval(itv.value)
  itv.value = setInterval(() => {
    diff.height = rootSize.height.value - ballSize.height.value
    diff.width = rootSize.width.value - ballSize.width.value

    // y轴
    ys += yv
    if (ys >= diff.height) {
      ys = diff.height
      yv = -yv
      ballRef.value.classList.add('_reverse')
    }
    if (ys <= 0) {
      yv = -yv
      ballRef.value.classList.remove('_reverse')
    }
    ballRef.value.style.top = ys + 'px'

    // x轴
    xs += xv
    if (xs >= diff.width) {
      xs = diff.width
      xv = -xv
    }
    if (xs <= 0) {
      xv = -xv
    }
    ballRef.value.style.left = xs + 'px'
  }, 10)
}

onMounted(() => {
  setBounce()
})
onBeforeUnmount(() => {
  clearInterval(itv.value)
})
</script>

<template>
  <div ref="rootRef" class="bouncy-ball-wrap">
    <img ref="ballRef" src="@/assets/icons/iexplore.exe(7).png" />
    <!--    <img ref="ballRef" src="@/assets/icons/shell32.dll(16826).png" />-->
  </div>
</template>

<style lang="scss" scoped>
.bouncy-ball-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  img {
    width: 128px;
    height: 128px;
    position: absolute;
    animation: rotate 1s infinite linear;
    //box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.56);
    //border-radius: 100px;
    //transition: all 0.05s linear;

    &._reverse {
      animation-direction: reverse;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
}
</style>
