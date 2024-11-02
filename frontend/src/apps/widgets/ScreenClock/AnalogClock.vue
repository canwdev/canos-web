<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref} from 'vue'
import {useResizeObserver} from '@vueuse/core'

const props = defineProps({})

const utilityClock = (container: HTMLElement) => {
  const minuteText = (n: number) => {
    const element = document.createElement('div')
    element.className = 'minute-text'
    element.innerHTML = (n < 10 ? '0' : '') + n
    position(element, n / 60, 135)
    dynamic.appendChild(element)
  }

  const rotate = (element: HTMLElement, second: number) => {
    element.style.transform = element.style.webkitTransform = `rotate(${second * 6}deg)`
  }

  const position = (element: HTMLElement, phase: number, r: number) => {
    const theta = phase * 2 * Math.PI
    element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
    element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
  }

  const minuteLine = (n: number) => {
    const anchor = document.createElement('div')
    anchor.className = 'anchor'
    const element = document.createElement('div')
    element.className = 'element minute-line'
    rotate(anchor, n)
    anchor.appendChild(element)
    dynamic.appendChild(anchor)
  }

  const dynamic = container.querySelector('.dynamic') as HTMLElement
  const hourElement = container.querySelector('.hour') as HTMLElement
  const minuteElement = container.querySelector('.minute') as HTMLElement
  const secondElement = container.querySelector('.second') as HTMLElement

  const minute = (n: number) => {
    return n % 5 === 0 ? minuteText(n) : minuteLine(n)
  }

  const hour = (n: number) => {
    const element = document.createElement('div')
    element.className = 'hour-text hour-' + n
    element.innerHTML = n.toString()
    position(element, n / 12, 105)
    dynamic.appendChild(element)
  }

  const animate = () => {
    const now = new Date()
    const time =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds() +
      now.getMilliseconds() / 1000
    rotate(secondElement, time)
    rotate(minuteElement, time / 60)
    rotate(hourElement, time / 60 / 12)
    requestAnimationFrame(animate)
  }

  for (let i = 1; i <= 60; i++) minute(i)
  for (let i = 1; i <= 12; i++) hour(i)
  animate()
}

const autoResize = (element: HTMLElement, scale: number = 1) => {
  const update = () => {
    element.style.transform = element.style.webkitTransform = `scale(${scale.toFixed(3)})`
  }
  update()
  window.addEventListener('resize', update)
  return () => window.removeEventListener('resize', update)
}

const rootRef = ref()
useResizeObserver(rootRef, (entries) => {
  const entry = entries[0]
  const {width, height} = entry.contentRect
  const scale = Math.min(width, height) / 300
  autoResize(rootRef.value, scale)
})
onMounted(() => {
  utilityClock(rootRef.value)
})
</script>

<template>
  <!--
 Recreating Apple Watch's Utility face <http://www.apple.com/watch/design/> in HTML+CSS+JS
 -->
  <div ref="rootRef" class="apple-clock-fill">
    <div class="apple-clock" id="utility-clock">
      <div class="clock-centre">
        <div class="dynamic"></div>
        <div class="expand round circle-1"></div>
        <div class="anchor hour">
          <div class="element thin-hand"></div>
          <div class="element fat-hand"></div>
        </div>
        <div class="anchor minute">
          <div class="element thin-hand"></div>
          <div class="element fat-hand minute-hand"></div>
        </div>
        <div class="anchor second">
          <div class="element second-hand"></div>
        </div>
        <div class="expand round circle-2"></div>
        <div class="expand round circle-3"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.apple-clock-fill {
  position: relative;
  height: 100%;
  width: 100%;
  .apple-clock {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .clock-centre {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
  }

  .expand {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .anchor {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;

    .element {
      position: absolute;
      top: 0;
      left: 0;
    }

    .second-hand {
      width: 2px;
      height: 164px;
      background: $primary;
      transform: translate(-50%, -100%) translateY(24px);
    }

    .thin-hand {
      width: 4px;
      height: 50px;
      background: currentColor;
      transform: translate(-50%, -100%);
    }

    .fat-hand {
      width: 10px;
      height: 57px;
      border-radius: 10px;
      background: currentColor;
      transform: translate(-50%, -100%) translateY(-18px);
    }

    .minute-hand {
      height: 112px;
    }

    .minute-line {
      background: currentColor;
      width: 1px;
      height: 9px;
      transform: translate(-50%, -100%) translateY(-131px);
      opacity: 0.34;
    }
  }

  .round {
    border-radius: 50%;
  }

  .circle-1 {
    background: currentColor;
    width: 12px;
    height: 12px;
  }

  .circle-2 {
    background: $primary;
    width: 8px;
    height: 8px;
  }

  .circle-3 {
    background: #000;
    width: 4px;
    height: 4px;
  }

  .second {
    transform: rotate(180deg);
  }

  .minute {
    transform: rotate(54deg);
  }

  .hour {
    transform: rotate(304.5deg);
  }

  .hour-text {
    position: absolute;
    font:
      40px Hei,
      Helvetica,
      Arial,
      sans-serif;
    color: currentColor;
    transform: translate(-50%, -50%);
  }

  .hour-10 {
    padding-left: 0.4ex;
  }

  .hour-11 {
    padding-left: 0.25ex;
  }

  .minute-text {
    position: absolute;
    font:
      12px Avenir Next,
      Helvetica,
      Arial,
      sans-serif;
    color: currentColor;
    transform: translate(-50%, -50%);
  }
}
</style>
