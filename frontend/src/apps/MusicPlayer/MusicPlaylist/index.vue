<script setup lang="ts">
import {defineComponent} from 'vue'
import PlaylistItem from '@/apps/MusicPlayer/MusicPlaylist/PlaylistItem.vue'
import {MusicItem, useMusicStore} from '@/apps/MusicPlayer/utils/music-state'

const musicStore = useMusicStore()
const filterText = ref('')

const handleItemClick = (item: MusicItem) => {
  const idx = musicStore.playingList.findIndex((i) => i.guid === item.guid)
  if (!idx) {
    console.error('idx not found!')
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
    <n-space class="playlist-action-bar">
      <n-input :placeholder="$t('filter-by-name')" v-model:value="filterText" size="tiny" />
      {{ musicStore.playingIndex + 1 }} / {{ musicStore.playingList.length }}
    </n-space>
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
    z-index: 1;
  }
}
</style>
