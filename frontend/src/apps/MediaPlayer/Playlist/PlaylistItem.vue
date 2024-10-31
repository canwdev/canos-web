<script setup lang="ts">
import CoverMini from '@/apps/MediaPlayer/CoverMini.vue'
import {MediaItem} from '@/apps/MediaPlayer/utils/music-state'
import {useMediaStore} from '@/apps/MediaPlayer/utils/media-store'

interface Props {
  item: MediaItem
}
const props = withDefaults(defineProps<Props>(), {})
const storeId = inject('storeId')
const mediaStore = useMediaStore(storeId.value)

const {item} = toRefs(props)
const isCurrent = computed(() => {
  return item.value.guid === mediaStore.mediaItem?.guid
})
</script>

<template>
  <div class="playlist-item">
    <div class="item-left">
      <div v-if="isCurrent" class="status-icon">
        <template v-if="!mediaStore.paused">
          <i class="fa fa-play" aria-hidden="true"></i>
        </template>
        <template v-else>
          <i class="fa fa-pause" aria-hidden="true"></i>
        </template>
      </div>
      <CoverMini :src="item.cover" force-show-icon :is-video="item.type === 'video'" />
    </div>
    <div class="item-main">
      <div class="item-title">{{ item.titleDisplay }}</div>
      <div class="item-subtitle">{{ item.artistsAlbumDisplay }}</div>
    </div>
    <div class="item-right"></div>
  </div>
</template>

<style lang="scss" scoped>
.playlist-item {
  padding: 4px;
  word-break: break-word;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-bottom: 1px solid $color_border;

  &:hover {
    background-color: rgba(204, 204, 204, 0.2);
  }

  .item-left {
    display: inline-flex;
    position: relative;
    .status-icon {
      position: absolute;
      z-index: 1;
      font-size: 14px;
    }
  }

  .item-main {
    flex: 1;
    .item-title {
      font-size: 14px;
      font-weight: 500;
    }
    .item-subtitle {
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
