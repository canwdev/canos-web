<script setup lang="ts">
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import {TaskItem, TaskQueue} from '@/utils/task-queue'
import {fsWebApi} from '@/api/filesystem'

import {bytesToSize} from '@/utils'

const emit = defineEmits(['complete'])

const listData = ref<any[]>([])
const isVisible = ref(false)

const abortController = shallowRef<any>(new AbortController())

watch(isVisible, (val) => {
  if (!val) {
    abortController.value.abort()
    listData.value = []
    taskQueueRef.value.removeAllTask()
    abortController.value = null
  }
})

const taskHandler = (task: TaskItem) => {
  const {data} = task
  // console.log('--- taskHandler', task, data)
  return new Promise(async (resolve, reject) => {
    try {
      const {path, file} = data
      await fsWebApi.createFile(
        {
          path,
          file,
        },
        {
          onUploadProgress(event) {
            // console.log(event)
            data.progress = event.progress
            data.loaded = event.loaded
            data.total = event.total
            data.rate = event.rate
            data.bytes = event.bytes
          },
          signal: abortController.value.signal,
        },
      )
      data.success = true
      resolve(data)
    } catch (e: any) {
      console.error(e.message)
      data.failed = true
      data.reason = e.message
      reject(e)
    }
  })
}

const taskQueueRef = ref()
onMounted(() => {
  taskQueueRef.value = new TaskQueue({
    concurrent: 2,
    taskHandler,
  })
  taskQueueRef.value.on('allDone', () => {
    emit('complete')
  })
})
onBeforeUnmount(() => {
  taskQueueRef.value.removeAllTask()
  taskQueueRef.value = []
})

const addTask = (data) => {
  data = {
    ...data,
    progress: 0,
    loaded: 0,
    total: 0,
    rate: 0,
    bytes: 0,
    success: false,
    failed: false,
    reason: '',
  }
  if (!abortController.value) {
    abortController.value = new AbortController()
  }
  listData.value.push(data)
  taskQueueRef.value.addTask(data)
  isVisible.value = true
}

defineExpose({
  addTask,
})
</script>

<template>
  <ViewPortWindow v-model:visible="isVisible">
    <template #titleBarLeft>[{{ taskQueueRef?.tasks?.length }}] Upload Files</template>

    <div class="upload-wrap">
      <div
        v-for="(item, index) in listData"
        :class="{failed: item.failed}"
        :key="index"
        class="upload-item"
      >
        <span style="font-size: 20px" :title="item.reason">
          <template v-if="item.success">✅</template>
          <template v-else-if="item.failed">⛔</template>
          <template v-else-if="item.progress > 0">🔄</template>
          <template v-else>⏸️</template>
        </span>
        <div class="upload-content">
          <div class="upload-title text-overflow" :title="item.path">{{ item.name }}</div>
          <div v-if="item.progress > 0" class="upload-status font-code">
            Progress: <span>{{ (item.progress * 100).toFixed(0) }}%</span> |
            {{ bytesToSize(item.loaded) }}/{{ bytesToSize(item.total) }}
            <br />
            Speed: {{ bytesToSize(item.rate) }}/s <br />
          </div>

          <div class="volume-bar">
            <div :style="{width: item.progress * 100 + '%'}" class="volume-value"></div>
          </div>
        </div>
      </div>
    </div>
  </ViewPortWindow>
</template>

<style scoped lang="scss">
.upload-wrap {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .upload-item {
    padding: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
    &:hover {
      background-color: $color_hover;
    }
    .upload-content {
      flex: 1;
    }
    .upload-title {
      font-size: 12px;
    }
    .upload-status {
      font-size: 12px;
      span {
        color: $primary;
      }
    }

    .volume-bar {
      margin-top: 4px;
      overflow: hidden;
      height: 4px;
      width: 100%;
      position: relative;
      background-color: $color_border;

      .volume-value {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0%;
        background-color: $primary;
        transition: all 0.3s;
      }
    }

    &.failed {
      .volume-bar {
        .volume-value {
          background-color: #f44336;
        }
      }
    }
  }
}
</style>
