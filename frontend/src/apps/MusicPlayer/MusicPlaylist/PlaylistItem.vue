<script setup lang="ts">
import CoverMini from '@/apps/MusicPlayer/CoverMini.vue'
import {MusicItem, useMusicStore} from '@/apps/MusicPlayer/utils/music-state'

interface Props {
  item: MusicItem
}
const props = withDefaults(defineProps<Props>(), {})
const musicStore = useMusicStore()

const {item} = toRefs(props)
const isCurrent = computed(() => {
  return item.value.guid === musicStore.musicItem?.guid
})
</script>

<template>
  <div class="playlist-item">
    <div class="item-left">
      <div v-if="isCurrent" class="status-icon">
        <template v-if="!musicStore.paused">▶️</template>
        <template v-else>⏸️</template>
      </div>
      <CoverMini :src="item.cover" force-show-icon />
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
  transition: all 0.3s;
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
      svg {
        width: 16px;
        height: 16px;
      }
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
