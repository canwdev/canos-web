<script lang="ts">
export default {
  name: 'MediaPlayer',
}
</script>

<script lang="ts" setup>
import MusicDetail from '@/apps/MediaPlayer/MusicDetail.vue'
import PlayerCore from '@/apps/MediaPlayer/PlayerCore.vue'
import MusicControl from '@/apps/MediaPlayer/MusicControl.vue'
import MusicPlaylist from '@/apps/MediaPlayer/Playlist/index.vue'
import {IEntry} from '@server/types/server'
import {MediaItem} from '@/apps/MediaPlayer/utils/music-state'
import {isSupportedMediaFormat} from '@/utils/is'
import FoldableSidebarLayout from '@/components/CanUI/packages/Layouts/FoldableSidebarLayout.vue'
import {useMediaStore} from '@/apps/MediaPlayer/utils/media-store'
import {guid} from '@/utils'

type AppParams = {
  item: IEntry
  list: IEntry[]
  basePath: string
}

const props = withDefaults(
  defineProps<{
    appParams?: AppParams
  }>(),
  {},
)

// const {params} = toRefs(props)

const storeId = ref(`mediaStore_${guid()}`)
// 向所有子组件传参
provide('storeId', storeId)

const mediaStore = useMediaStore(storeId.value)

// 应用启动传参
watch(
  () => props.appParams,
  () => {
    console.log(props.appParams)
    if (!props.appParams) {
      return
    }
    const {item, list, basePath} = props.appParams
    const medias = list
      .map((i) => new MediaItem(i.name, basePath))
      .filter((i) => {
        return isSupportedMediaFormat(i.filename)
      })
    const idx = medias.findIndex((i) => i.filename === item.name)

    mediaStore.playFromList(medias, idx)
  },
  {immediate: true},
)
</script>

<template>
  <div class="media-player-wrap">
    <div class="music-above">
      <FoldableSidebarLayout>
        <template #sidebar>
          <MusicPlaylist />
        </template>
        <template #default>
          <div class="media-detail">
            <PlayerCore v-show="mediaStore.isVideo" />
            <MusicDetail />
          </div>
        </template>
      </FoldableSidebarLayout>
    </div>
    <div class="music-below">
      <MusicControl />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-player-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .music-above {
    flex: 1;
    overflow: hidden;
  }
  .media-detail {
    height: 100%;
  }
  .music-below {
    height: 75px;
  }
}
</style>
