<script setup lang="ts">
import {fsWebApi} from '@/api/filesystem'
import {IDrive} from '@server/types/server'
import {useStorage} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {ChevronLeft20Filled} from '@vicons/fluent'
import {normalizePath} from '@/apps/FileManager/utils'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'

interface Props {
  width?: string
  currentPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '180px',
})

const {currentPath} = toRefs(props)

const emit = defineEmits(['openDrive'])

const isLoading = ref(false)
const dataList = ref<IDrive[]>([])

const getPathNormalized = (path) => {
  path = normalizePath(path)
  if (!/\/$/gi.test(path)) {
    path += '/'
  }
  return path
}

const handleRefresh = async () => {
  try {
    isLoading.value = true

    const drives = (await fsWebApi.getDrives({})) as unknown as IDrive[]
    dataList.value = drives.map((i) => {
      return {
        ...i,
        path: getPathNormalized(i.path),
      }
    })

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
    return 'user-home'
  }
  if (!item.total) {
    return 'dialog-warning'
  }
  return 'drive-harddisk'
}

const showSidebar = useStorage(LsKeys.EXPLORER_SHOW_SIDEBAR, true)

const handleOpen = (item) => {
  if (item.path !== currentPath.value) {
    emit('openDrive', item)
  }
}
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
      <button
        class="drive-item btn-no-style"
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.path"
        :class="{active: item.path === currentPath}"
        @click="handleOpen(item)"
      >
        <div class="drive-icon">
          <ThemedIcon :name="getIcon(item)" />
        </div>
        <div class="drive-content">
          <div class="drive-title text-overflow">{{ item.label }}</div>
          <div v-if="item.total" class="volume-bar">
            <div :style="{width: (item!.free / item.total) * 100 + '%'}" class="volume-value"></div>
          </div>
        </div>
      </button>
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
    display: flex;
    width: 100%;
    text-align: unset;
    cursor: pointer;
    padding: 4px 6px;
    box-sizing: border-box;
    gap: 6px;
    align-items: center;

    &.active {
      background-color: $primary_opacity !important;
    }

    &:focus {
      outline: 1px solid $primary;
      outline-offset: -1px;
    }

    .drive-icon {
      width: 20px;
      height: 20px;
      display: flex;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .drive-content {
      flex: 1;
      overflow: hidden;
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
