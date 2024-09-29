<script setup lang="ts">
import {fsWebApi} from '@/api/filesystem'
import {IDrive} from '@server/types/server'
import {useStorage} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {normalizePath} from '@/apps/FileManager/utils'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {bytesToSize} from '@/utils'

interface Props {
  width?: string
  currentPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '160px',
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

const getTitle = (item) => {
  let txt = `Path: ${item.path}`

  if (item.total) {
    txt += `
Used: ${((item!.free / item.total) * 100).toFixed(0) + '%'}
Storage: ${bytesToSize(item.free)} / ${bytesToSize(item.total)}
`
  }
  return txt
}
</script>

<template>
  <div class="explorer-file-sidebar" :style="{width: showSidebar ? width : '0'}">
    <button
      class="btn-toggle btn-no-style"
      :class="{_folded: !showSidebar}"
      @click="showSidebar = !showSidebar"
    >
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 16 16"
      >
        <g fill="none">
          <path
            d="M10.354 3.146a.5.5 0 0 1 0 .708L6.207 8l4.147 4.146a.5.5 0 0 1-.708.708l-4.5-4.5a.5.5 0 0 1 0-.708l4.5-4.5a.5.5 0 0 1 .708 0z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </button>

    <slot></slot>

    <div class="file-sidebar-content">
      <button
        class="drive-item btn-no-style"
        v-for="(item, index) in dataList"
        :key="index"
        :title="getTitle(item)"
        :class="{active: item.path === currentPath}"
        @click="handleOpen(item)"
      >
        <span class="drive-icon">
          <ThemedIcon :name="getIcon(item)" />
        </span>
        <span class="drive-content">
          <span class="drive-title text-overflow">{{ item.label }}</span>
          <span v-if="item.total" class="volume-bar">
            <span
              :style="{width: (item!.free / item.total) * 100 + '%'}"
              class="volume-value"
            ></span>
          </span>
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.explorer-file-sidebar {
  //width: 180px;
  height: 100%;
  border-right: 1px solid $color_border;
  position: relative;
  display: flex;
  gap: 8px;
  flex-direction: column;

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
    span {
    }
  }
  .file-sidebar-content {
    flex: 1;
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
      align-items: center;
      justify-content: center;

      i {
        display: flex;
      }
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
