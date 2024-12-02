<script setup lang="ts">
import {bytesToSize, formatDate} from '@/utils'
import {IEntry} from '@server/types/server'
import {useFileItem} from './hooks/use-file-item'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'

const emit = defineEmits(['open', 'select'])

interface Props {
  item: IEntry
  active: boolean
  showCheckbox?: boolean
}
const props = withDefaults(defineProps<Props>(), {})

const {iconName, iconClass, titleDesc, extDisplay, nameDisplay, shortcutAppid} = useFileItem(props)
</script>

<template>
  <button
    class="btn-no-style file-list-item file-list-row"
    :class="{active, hidden: item.hidden}"
    @click.stop="$emit('select', {item, event: $event})"
    @keyup.enter="$emit('open', item)"
    @dblclick.stop="$emit('open', item)"
    :title="titleDesc"
  >
    <div class="list-col c-checkbox">
      <input
        v-if="showCheckbox"
        class="file-checkbox"
        type="checkbox"
        :checked="active"
        @click.stop="$emit('select', {item, event: $event, toggle: true})"
        @dblclick.stop
      />
    </div>
    <span class="list-col c-filename">
      <ThemedIcon
        :name="iconName"
        :icon-class="iconClass"
        :sub-name="shortcutAppid ? 'shortcut' : ''"
      />
      <span class="text-overflow filename-text" @click.stop="$emit('open', item)" @dblclick.stop>
        {{ nameDisplay }}
      </span>
    </span>
    <span class="list-col c-ext text-overflow">{{ extDisplay }}</span>
    <span class="list-col c-size">{{ bytesToSize(item.size) }}</span>
    <span class="list-col c-time">{{ formatDate(item.lastModified) }}</span>
    <span class="list-col c-time">{{ formatDate(item.birthtime) }}</span>
  </button>
</template>

<style lang="scss" scoped>
.file-list-item {
  display: flex;
  text-align: unset;
  width: 100%;
  border-bottom: 1px solid $color_border;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: default;
  &:hover {
    transition: background-color 0s;
    background-color: $primary_opacity;
    .file-checkbox {
      visibility: visible;
    }
  }
  &.hidden {
    .filename-text {
      opacity: 0.6;
    }
  }

  &.active {
    background-color: $primary_opacity;
    outline: 1px solid $primary;
    outline-offset: -1px;
    .file-checkbox {
      visibility: visible;
    }
  }
  &:focus {
    outline: 1px solid $primary;
    outline-offset: -1px;
  }

  .file-checkbox {
    visibility: hidden;
    position: relative;
  }

  .list-col {
    &.c-filename {
      .themed-icon {
        width: 18px;
        height: 18px;
      }
      .filename-text {
        font-size: 12px;
        line-height: 1.2;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &.c-ext {
      font-size: 12px;
    }

    &.c-size {
      font-size: 12px;
    }

    &.c-time {
      font-size: 12px;
    }
  }
}
</style>
