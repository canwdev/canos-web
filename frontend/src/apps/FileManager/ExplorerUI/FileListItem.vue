<script setup lang="ts">
import {bytesToSize, formatDate} from '@/utils'
import {Folder20Regular, Document20Regular} from '@vicons/fluent'
import {IEntry} from '@server/types/server'

const emit = defineEmits(['open', 'select'])

interface Props {
  item: IEntry
  active: boolean
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div
    class="file-list-item file-list-row"
    :class="{active, hidden: item.hidden}"
    @click.stop="$emit('select', {item, event: $event})"
    @dblclick.stop="$emit('open', item)"
  >
    <div class="list-col c-filename">
      <n-icon size="20">
        <Folder20Regular v-if="item.isDirectory" />
        <Document20Regular v-else />
      </n-icon>
      <span
        class="text-overflow filename-text"
        @click.stop="$emit('open', item)"
        :title="item.name"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="list-col c-size">{{ bytesToSize(item.size) }}</div>
    <div class="list-col c-time">{{ formatDate(item.lastModified) }}</div>
  </div>
</template>

<style lang="scss" scoped>
.file-list-item {
  border-bottom: 1px solid $color_border;
  transition: all 0.3s;
  padding-top: 4px;
  padding-bottom: 4px;
  &:hover {
    transition: background-color 0s;
    background-color: $primary_opacity;
  }
  &.hidden {
    & > * {
      opacity: 0.6;
    }
  }

  &.active {
    background-color: $primary;
    color: white;
  }

  .list-col {
    &.c-filename {
      .filename-text {
        font-size: 12px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
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
