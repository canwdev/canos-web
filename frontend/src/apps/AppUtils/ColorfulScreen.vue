<script lang="ts" setup>
import {useCycleList, useEventListener, useFullscreen} from '@vueuse/core'

const colorList = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#00FFFF',
  '#FFFF00',
  '#FF00FF',
  '#FFFFFF',
  '#000000',
]
const randomIndex = Math.floor(Math.random() * colorList.length)

const {state, next, prev, go} = useCycleList(colorList, {initialValue: colorList[randomIndex]})

const isHide = ref(false)
const rootRef = ref()
const {isFullscreen, enter, exit, toggle} = useFullscreen(rootRef)
</script>

<template>
  <div
    ref="rootRef"
    class="colorful-screen"
    :style="{
      backgroundColor: state,
    }"
    @click="isHide = !isHide"
    @dblclick="toggle"
    @keyup.enter="toggle"
    tabindex="0"
    @keydown.space="() => next()"
    @keydown.right="() => next()"
    @keydown.up="() => next()"
    @keydown.left="() => prev()"
    @keydown.down="() => prev()"
  >
    <div
      @dblclick.stop
      @click.stop
      :style="{visibility: isHide ? 'hidden' : 'visible'}"
      class="ctrl-bar"
    >
      <button class="vp-button" @click="() => prev()">⏮️Prev</button>
      <span @click="toggle" class="cur-color">{{ state }}</span>
      <button class="vp-button" @click="() => next()">Next⏭️</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.colorful-screen {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: all 1s;
  outline: none;

  .ctrl-bar {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px;
    min-width: 100%;
    text-align: center;
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
    user-select: none;

    .cur-color {
      background-color: white;
      color: black;
      padding: 2px;
      cursor: pointer;
    }
    .vp-button {
      padding: 2px 4px;
    }
  }
}
</style>
