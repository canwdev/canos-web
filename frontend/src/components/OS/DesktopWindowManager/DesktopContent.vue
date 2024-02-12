<script lang="ts">
import {defineComponent} from 'vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'

export default defineComponent({
  name: 'DesktopContent',
  setup() {
    const systemStore = useSystemStore()

    const handleItemClick = (item: ShortcutItem) => {
      systemStore.createTask(item)
    }
    return {
      systemStore,
      handleItemClick,
    }
  },
})
</script>

<template>
  <div class="desktop-content">
    <button
      v-for="(item, index) in systemStore.allApps"
      :key="index"
      @dblclick="handleItemClick(item)"
      class="desktop-icon-wrap btn-no-style"
    >
      <span class="desktop-icon">
        <img class="desktop-icon-image" :src="item.icon" :alt="item.title" />
        <span class="desktop-icon-name">{{ item.title }}</span>
      </span>
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

  .desktop-icon-wrap {
    .desktop-icon {
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: default;
      &:active {
        outline: 1px dashed white;
      }
      &:hover {
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
      }
    }
  }
}
</style>
