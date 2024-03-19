<script lang="ts" setup>
import MusicDetail from '@/apps/MusicPlayer/MusicDetail.vue'
import PlayerCore from '@/apps/MusicPlayer/PlayerCore.vue'
import MusicControl from '@/apps/MusicPlayer/MusicControl.vue'
import MusicPlaylist from '@/apps/MusicPlayer/MusicPlaylist/index.vue'
import {IEntry} from '@server/types/server'
import {MusicItem, useMusicStore} from '@/apps/MusicPlayer/utils/music-state'
import {isSupportedMusicFormat} from '@/utils/is'

type AppParams = {
  item: IEntry
  list: IEntry[]
  basePath: string
}

interface Props {
  appParams?: AppParams
}

const props = withDefaults(defineProps<Props>(), {})

// const {params} = toRefs(props)

const musicStore = useMusicStore()

watch(
  () => props.appParams,
  () => {
    console.log(props.appParams)
    if (!props.appParams) {
      return
    }
    const {item, list, basePath} = props.appParams
    const musics = list
      .map((i) => new MusicItem(i.name, basePath))
      .filter((i) => {
        return isSupportedMusicFormat(i.filename)
      })
    const idx = musics.findIndex((i) => i.filename === item.name)

    musicStore.playFromList(musics, idx)
  },
  {immediate: true},
)

const isShowPlaylist = ref(true)
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
      <PlayerCore v-show="false" />
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
