<script lang="ts">
import {defineComponent} from 'vue'
import MusicDetail from '@/apps/MusicPlayer/MusicDetail.vue'
import PlayerCore from '@/apps/MusicPlayer/PlayerCore.vue'
import MusicControl from '@/apps/MusicPlayer/MusicControl.vue'
import MusicPlaylist from '@/apps/MusicPlayer/MusicPlaylist/index.vue'

export default defineComponent({
  name: 'MusicPlayer',
  components: {MusicPlaylist, MusicControl, PlayerCore, MusicDetail},
  setup() {
    const isShowPlaylist = ref(true)
    return {
      isShowPlaylist,
    }
  },
})
</script>

<template>
  <div class="music-player-wrap">
    <div class="music-above">
      <MusicPlaylist v-show="isShowPlaylist" />
      <MusicDetail v-show="!isShowPlaylist" />
    </div>
    <div class="music-below">
      <MusicControl
        @onCoverClick="isShowPlaylist = !isShowPlaylist"
        @onTitleClick="isShowPlaylist = !isShowPlaylist"
      />
      <PlayerCore />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-player-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .music-above {
    flex: 1;
    overflow: hidden;
  }
  .music-below {
    height: 75px;
  }
}
</style>
