<script setup lang="ts">
import {fsWebApi} from '@/api/filesystem'
import {IDrive} from '@server/types/server'
import {handleAssetsUrl} from '@/utils/vite-utils'
import {useStorage} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {ChevronLeft20Filled} from '@vicons/fluent'

interface Props {
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '180px',
})

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

const getIcon = (item: IDrive) => {
  if (item.label.toLowerCase() === 'home') {
    return handleAssetsUrl('@/assets/icons/shell32.dll(51380).png')
  }
  if (!item.total) {
    return handleAssetsUrl('@/assets/icons/shell32.dll(54).png')
  }
  return handleAssetsUrl('@/assets/icons/shell32.dll(8).png')
}

const showSidebar = useStorage(LsKeys.EXPLORER_SHOW_SIDEBAR, true)
</script>

<template>
  <div class="file-sidebar" :style="{width: showSidebar ? width : '0'}">
    <button
      class="btn-toggle btn-no-style"
      :class="{_folded: !showSidebar}"
      @click="showSidebar = !showSidebar"
    >
      <ChevronLeft20Filled />
    </button>
    <div class="file-sidebar-content">
      <div
        class="drive-item"
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.path"
        @click="$emit('openDrive', item)"
      >
        <div class="drive-icon">
          <img :src="getIcon(item)" />
        </div>
        <div class="drive-content">
          <div class="drive-title text-overflow">{{ item.label }}</div>
          <div v-if="item.total" class="volume-bar">
            <div :style="{width: (item!.free / item.total) * 100 + '%'}" class="volume-value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-sidebar {
  //width: 180px;
  height: 100%;
  border-right: 1px solid $color_border;
  position: relative;
  .btn-toggle {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.3;
    transition: all 1s;
    z-index: 10;
    &._folded {
      right: -20px;
      svg {
        transform: rotate(180deg);
      }
    }
    &:hover {
      opacity: 1;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .file-sidebar-content {
    height: 100%;
    overflow: auto;
  }

  .drive-item {
    cursor: pointer;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    gap: 8px;
    align-items: center;

    .drive-icon {
      width: 26px;
      height: 26px;
      display: flex;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .drive-content {
      flex: 1;
    }

    &:hover {
      background-color: $color_hover;
    }
    & + .drive-item {
      border-top: 1px solid $color_border;
    }

    .drive-title {
      font-size: 12px;
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
