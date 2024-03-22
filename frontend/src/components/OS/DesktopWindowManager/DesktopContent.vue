<script setup lang="ts">
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useSelectionArea} from '@/hooks/use-selection-area'

const systemStore = useSystemStore()

const handleItemClick = (item: ShortcutItem) => {
  systemStore.createTask(item)
}

const selected = reactive<Set<number>>(new Set())
const rootRef = ref()
useSelectionArea({
  containerRef: rootRef,
  selectables: ['.desktop-icon'],
  onStart: () => {
    selected.clear()
  },
  onStop: (stored) => {
    stored.forEach((el) => {
      const index = el.getAttribute('data-index')
      console.log(index)
      selected.add(Number(index))
    })
  },
})
</script>

<template>
  <div ref="rootRef" class="desktop-content" @click="selected.clear()">
    <button
      v-for="(item, index) in systemStore.allApps"
      :key="index"
      :data-index="index"
      :class="{active: selected.has(index)}"
      @dblclick.stop="handleItemClick(item)"
      @click.stop
      @keyup.enter="handleItemClick(item)"
      class="desktop-icon btn-no-style"
    >
      <img class="desktop-icon-image" :src="item.icon" :alt="item.title" />
      <span @dbclick.stop @click.stop="handleItemClick(item)" class="desktop-icon-name">{{
        item.title
      }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.desktop-content {
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 74px);
  grid-template-rows: repeat(auto-fill, 70px);
  place-content: flex-start;
  gap: 28px 1px;
  user-select: none;

  .desktop-icon {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: default;
    border-radius: 2px;

    &:focus {
      outline: 1px dashed white;
    }

    &:hover {
      background-color: rgba(224, 224, 224, 0.3);
    }

    &.active {
      background-color: rgba(224, 224, 224, 0.3);
    }

    .desktop-icon-image {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      pointer-events: none;
    }

    .desktop-icon-name {
      text-align: center;
      font-size: 12px;
      padding-top: 2px;
      padding-bottom: 2px;
      line-height: 1.4;
      text-shadow: 1px 1px 2px #000;

      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
