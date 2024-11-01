<script setup lang="ts">
import {IEntry} from '@server/types/server'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {useFileItem} from './hooks/use-file-item'

const emit = defineEmits(['open', 'select'])

interface Props {
  item: IEntry
  active: boolean
  showCheckbox?: boolean
}
const props = withDefaults(defineProps<Props>(), {})

const {iconName, titleDesc} = useFileItem(props)
</script>

<template>
  <button
    class="file-grid-item btn-no-style"
    :class="{active, hidden: item.hidden}"
    @click.stop="$emit('select', {item, event: $event})"
    @keyup.enter="$emit('open', item)"
    @dblclick.stop="$emit('open', item)"
    :title="titleDesc"
  >
    <input
      v-if="showCheckbox"
      class="file-checkbox"
      type="checkbox"
      :checked="active"
      @click.stop="$emit('select', {item, event: $event, toggle: true})"
      @dblclick.stop
    />
    <ThemedIcon class="desktop-icon-image" :name="iconName" />
    <span class="desktop-icon-name" @click.stop="$emit('open', item)" @dblclick.stop>{{
      item.name
    }}</span>
  </button>
</template>

<style lang="scss" scoped>
.file-grid-item {
  height: fit-content;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  cursor: default;
  width: 90px;
  padding: 8px 2px;
  box-sizing: border-box;
  position: relative;

  &:active,
  &:focus {
    outline: 1px dashed currentColor;
    outline-offset: -1px;
  }
  &:hover {
    background-color: rgba(224, 224, 224, 0.3);
    .file-checkbox {
      visibility: visible;
    }
  }
  &.hidden {
    & > * {
      opacity: 0.6;
    }
  }

  &.active {
    background-color: $primary_opacity;
    outline: 1px solid $primary;
    .file-checkbox {
      visibility: visible;
    }
  }

  .file-checkbox {
    position: absolute;
    top: 4px;
    left: 4px;
    visibility: hidden;
  }

  .desktop-icon-image {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    pointer-events: none;
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
  }

  .desktop-icon-name {
    text-align: center;
    font-size: 12px;
    padding-top: 4px;
    line-height: 1.4;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
