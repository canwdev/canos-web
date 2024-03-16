<script setup lang="ts">
import {fsWebApi} from '@/api/filesystem'
import {IDrive} from '@server/types/server'

const emit = defineEmits(['openDrive'])

const isLoading = ref(false)
const dataList = ref<IDrive[]>([])

const handleRefresh = async () => {
  try {
    isLoading.value = true

    const drives = await fsWebApi.getDrives({})
    dataList.value = drives as unknown as IDrive[]

    if (drives[0]) {
      emit('openDrive', drives[0])
    }
  } catch (e) {
    console.error(e)
    dataList.value = []
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  handleRefresh()
})
</script>

<template>
  <div class="file-sidebar">
    <div
      class="drive-item"
      v-for="(item, index) in dataList"
      :key="index"
      :title="item.path"
      @click="$emit('openDrive', item)"
    >
      <div class="drive-title text-overflow">{{ item.label }}</div>
      <div v-if="item.total" class="volume-bar">
        <div :style="{width: (item!.free / item.total) * 100 + '%'}" class="volume-value"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-sidebar {
  width: 150px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid $color_border;

  .drive-item {
    cursor: pointer;
    padding: 8px;
    box-sizing: border-box;

    &:hover {
      background-color: $color_hover;
    }
    & + .drive-item {
      border-top: 1px solid $color_border;
    }

    .drive-title {
      font-size: 16px;
      line-height: 1.4;
    }

    .volume-bar {
      margin-top: 2px;
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
  }
}
</style>
