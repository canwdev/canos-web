<script lang="ts" setup="">
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'

const props = withDefaults(
  defineProps<{
    shortcutItem: ShortcutItem
    active?: boolean
  }>(),
  {
    active: false,
  },
)
const emit = defineEmits([])
const systemStore = useSystemStore()
</script>

<template>
  <button
    :class="{active}"
    @click.stop="$emit('openItem', shortcutItem)"
    @keyup.enter="$emit('openItem', shortcutItem)"
    class="desktop-icon btn-no-style"
    :disabled="shortcutItem.requireBackend && !systemStore.isBackendAvailable"
  >
    <ThemedIcon class="desktop-icon-image" :name="shortcutItem.icon" />
    <span @dbclick.stop class="desktop-icon-name">{{ shortcutItem.title }}</span>
  </button>
</template>

<style lang="scss" scoped>
.desktop-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:focus {
    //outline: 1px dashed white;
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
    line-height: 1.4;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.44);
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
  }
}
</style>
