<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {bytesToSize, formatDate} from '@/utils'
import {BackendFileItem} from '@/enum/file'
import {Folder20Regular, Document20Regular, Rename20Regular, Delete20Regular} from '@vicons/fluent'

export default defineComponent({
  name: 'FileListItem',
  components: {
    Folder20Regular,
    Document20Regular,
    Rename20Regular,
    Delete20Regular,
  },
  props: {
    item: {
      type: Object as PropType<BackendFileItem>,
      required: true,
    },
  },
  emits: ['openFile'],
  setup() {
    return {
      bytesToSize,
      formatDate,
    }
  },
})
</script>

<template>
  <div class="file-list-item file-list-row">
    <div class="list-col c-filename">
      <n-icon size="20">
        <Folder20Regular v-if="item.isDirectory" />
        <Document20Regular v-else />
      </n-icon>
      <span
        class="text-overflow filename-text"
        @click.stop="$emit('openFile')"
        :title="item.filename"
      >
        {{ item.filename }}
      </span>
    </div>
    <!--          <div class="list-col c-type">type</div>-->
    <div class="list-col c-size">{{ bytesToSize(item.size) }}</div>
    <div class="list-col c-time">{{ formatDate(item.birthtime) }}</div>
    <div class="list-col c-actions">
      <button
        disabled
        class="vp-button"
        @click.stop="handleFileAction('rename', item, index)"
        title="Rename"
      >
        <n-icon size="16">
          <Rename20Regular />
        </n-icon>
      </button>
      <button
        disabled
        class="vp-button"
        @click.stop="handleFileAction('delete', item, index)"
        title="Delete"
      >
        <n-icon size="16">
          <Delete20Regular />
        </n-icon>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-list-item {
  border-bottom: 1px solid $color_border;
  transition: all 0.3s;
  &:hover {
    transition: background-color 0s;
    background-color: $primary_opacity;
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

    &.c-actions {
      font-size: 12px;
    }
  }
}
</style>
