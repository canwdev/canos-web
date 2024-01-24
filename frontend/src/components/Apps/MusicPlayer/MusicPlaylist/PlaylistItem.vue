<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {MusicItem} from '@/enum/music'
import CoverMini from '@/components/Apps/MusicPlayer/CoverMini.vue'
import {useMusicStore} from '@/store/music'

export default defineComponent({
  name: 'PlaylistItem',
  components: {CoverMini},
  props: {
    item: {
      type: Object as PropType<MusicItem>,
      required: true,
    },
  },
  setup(props, {emit}) {
    const {item} = toRefs(props)
    const musicStore = useMusicStore()
    return {
      musicStore,
      statusIconName: computed(() => {
        if (item.value.guid === musicStore.musicItem?.guid) {
          if (musicStore.paused) {
            return 'pause'
          } else {
            return 'play_arrow'
          }
        }
        return ''
      }),
    }
  },
})
</script>

<template>
  <div class="playlist-item">
    <div class="item-left">
      <div class="material-icons status-icon">{{ statusIconName }}</div>
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
  padding: 5px;
  word-break: break-word;
  display: flex;
  align-items: center;
  gap: 10px;
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
      font-size: 12px;
      z-index: 1;
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
