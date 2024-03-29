<script setup lang="ts">
import {IEntry} from '@server/types/server'
import {handleAssetsUrl} from '@/utils/vite-utils'
import {bytesToSize, formatDate} from '@/utils'

const emit = defineEmits(['open', 'select'])

interface Props {
  item: IEntry
  active: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const {item} = toRefs(props)
const iconSrc = computed(() => {
  if (item.value.isDirectory) {
    return handleAssetsUrl('@/assets/icons/shell32.dll(4).png')
  }
  return handleAssetsUrl('@/assets/icons/shell32.dll(1).png')
})
const titleDesc = computed(() => {
  return `Name: ${item.value.name}
Size: ${bytesToSize(item.value.size)}
Last Modified: ${formatDate(item.value.lastModified)}
`
})
</script>

<template>
  <div
    class="file-grid-item"
    :class="{active, hidden: item.hidden}"
    @click.stop="$emit('select', {item, event: $event})"
    @dblclick.stop="$emit('open', item)"
    :title="titleDesc"
  >
    <img class="desktop-icon-image" :src="iconSrc" />
    <span class="desktop-icon-name">{{ item.name }}</span>
  </div>
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
  &:active {
    outline: 1px dashed white;
  }
  &:hover {
    background-color: rgba(224, 224, 224, 0.3);
  }
  &.hidden {
    & > * {
      opacity: 0.6;
    }
  }

  &.active {
    background-color: $primary_opacity;
    outline: 1px solid $primary;
    color: white;
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
    padding-top: 4px;
    line-height: 1.4;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
