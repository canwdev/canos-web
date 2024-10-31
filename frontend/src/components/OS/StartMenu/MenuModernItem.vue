<script setup lang="ts">
import {ShortcutItem} from '@/enum/os'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import AutoRatioBox from '@/components/CanUI/packages/AutoRatioBox.vue'
import {IStartMenuItem} from '@/components/OS/StartMenu/types'

interface Props {
  menuItem: IStartMenuItem
  shortcutItem: ShortcutItem
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <AutoRatioBox
    tabindex="0"
    class="shortcut-item"
    :ratio="menuItem.size === 'lg' ? 0.5 : 1"
    :title="shortcutItem.title"
  >
    <div class="shortcut-inner">
      <div v-if="shortcutItem.icon" class="shortcut-icon">
        <ThemedIcon :name="shortcutItem.icon" />
      </div>
      <div class="shortcut-title">{{ shortcutItem.title }}</div>
    </div>
  </AutoRatioBox>
</template>

<style lang="scss" scoped>
.shortcut-item {
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 2px #000;
  &.sm {
    .shortcut-title {
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: left bottom;
      left: 4px;
      bottom: 4px;
    }
  }

  &.md {
    .shortcut-icon {
      width: 50px;
      height: 50px;
      transition: all 0.5s;
    }
  }
  &.lg {
    .shortcut-icon {
      width: 80px;
      height: 80px;
      transition: all 0.5s;
    }
  }
  &.xl {
    .shortcut-icon {
      width: 140px;
      height: 140px;
      transition: all 0.5s;
    }
  }
}
.shortcut-inner {
  height: 100%;
  width: 100%;
  padding: 4px;
  text-align: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: none;

  &:hover {
    background-color: $primary_opacity;
  }

  .shortcut-icon {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .shortcut-title {
    flex: 1;
    font-size: 13px;
    position: absolute;
    left: 8px;
    bottom: 8px;
    line-height: 1.1;
  }
}
</style>
