<script setup lang="ts">
import {defineComponent} from 'vue'
import PlaylistItem from '@/apps/MusicPlayer/MusicPlaylist/PlaylistItem.vue'
import {MusicItem, useMusicStore} from '@/apps/MusicPlayer/utils/music-state'
import musicBus, {MusicEvents} from '@/apps/MusicPlayer/utils/bus'

const musicStore = useMusicStore()
const filterText = ref('')

const handleItemClick = (item: MusicItem) => {
  const idx = musicStore.playingList.findIndex((i) => i.guid === item.guid)
  if (idx === -1) {
    console.error('idx not found!')
    return
  }
  if (idx === musicStore.playingIndex) {
    musicBus.emit(MusicEvents.ACTION_TOGGLE_PLAY)
    return
  }
  musicStore.playByIndex(idx)
}

const playlistFiltered = computed(() => {
  if (!filterText.value) {
    return musicStore.playingList
  }

  const reg = new RegExp(filterText.value, 'ig')
  return musicStore.playingList.filter((item) => {
    const title = item.titleDisplay
    return reg.test(item.titleDisplay) || reg.test(item.artistsAlbumDisplay)
  })
})
</script>

<template>
  <div class="music-play-list">
    <div class="vp-bg playlist-action-bar">
      <input class="vp-input" :placeholder="$t('filter-by-name')" v-model="filterText" />
      <span>{{ musicStore.playingIndex + 1 }} / {{ musicStore.playingList.length }}</span>
    </div>
    <div class="music-list">
      <PlaylistItem
        v-for="item in playlistFiltered"
        :key="item.guid"
        :item="item"
        @click="handleItemClick(item)"
      ></PlaylistItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-play-list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;

  .playlist-action-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }
}
</style>
