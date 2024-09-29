<script lang="ts" setup>
import MusicDetail from '@/apps/MusicPlayer/MusicDetail.vue'
import PlayerCore from '@/apps/MusicPlayer/PlayerCore.vue'
import MusicControl from '@/apps/MusicPlayer/MusicControl.vue'
import MusicPlaylist from '@/apps/MusicPlayer/MusicPlaylist/index.vue'
import {IEntry} from '@server/types/server'
import {MediaItem} from '@/apps/MusicPlayer/utils/music-state'
import {isSupportedMediaFormat} from '@/utils/is'
import FoldableSidebarLayout from '@/components/CanUI/packages/Layouts/FoldableSidebarLayout.vue'
import {useMediaStore} from '@/apps/MusicPlayer/utils/media-store'
import {guid} from '@/utils'

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
          <MusicDetail />
        </template>
      </FoldableSidebarLayout>
    </div>
    <div class="music-below">
      <MusicControl />
      <PlayerCore v-show="false" />
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
  .music-below {
    height: 75px;
  }
}
</style>
