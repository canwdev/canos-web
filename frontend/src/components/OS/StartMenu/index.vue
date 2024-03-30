<script lang="ts">
import {defineComponent} from 'vue'
import StartMenuItem from '@/components/OS/StartMenu/StartMenuItem.vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {onClickOutside, useFullscreen} from '@vueuse/core'
import globalEventBus, {GlobalEvents} from '@/utils/bus'

export default defineComponent({
  name: 'StartMenu',
  components: {StartMenuItem},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const mVisible = useModelWrapper(props, emit, 'visible')
    const systemStore = useSystemStore()

    const filterText = ref('')

    const handleItemClick = (item: ShortcutItem) => {
      mVisible.value = false

      systemStore.createTask(item)
    }

    const appListFiltered = computed(() => {
      return systemStore.allApps.filter((item) => {
        const reg = new RegExp(filterText.value, 'ig')
        return reg.test(item.title)
      })
    })

    const rootRef = ref()

    onClickOutside(rootRef, (event) => {
      if (mVisible.value) {
        setTimeout(() => {
          mVisible.value = false
        })
      }
    })

    const doShutdown = () => {
      mVisible.value = false
      systemStore.shutdown()
      window.close()
    }

    const doRefresh = () => {
      location.reload()
    }

    const doLogout = () => {
      globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)
    }

    const {toggle: toggleFullscreen} = useFullscreen(document.documentElement)

    return {
      rootRef,
      mVisible,
      systemStore,
      filterText,
      appListFiltered,
      handleItemClick,
      doShutdown,
      doRefresh,
      doLogout,
      toggleFullscreen,
    }
  },
})
</script>

<template>
  <div ref="rootRef" v-if="mVisible" class="start-menu vp-panel vp-window-panel _panel-bg">
    <div class="start-menu-row">
      <div class="start-menu-left">
        <div class="program-list">
          <div class="shortcut-list">
            <StartMenuItem
              :item="item"
              v-for="(item, index) in appListFiltered"
              :key="index"
              @click="handleItemClick(item)"
            />
          </div>
        </div>
      </div>
      <div class="start-menu-right">
        <div class="shortcut-list">
          <!--          <StartMenuItem-->
          <!--            :item="item"-->
          <!--            v-for="(item, index) in SystemAppList"-->
          <!--            :key="index"-->
          <!--            @click="handleItemClick(item)"-->
          <!--          />-->
          <button class="vp-button" @click="doRefresh">Refresh</button>
          <button class="vp-button" @click="doShutdown">Shutdown</button>
          <button class="vp-button" @click="toggleFullscreen">Fullscreen</button>
        </div>
      </div>
    </div>
    <div class="start-menu-row start-menu-bottom">
      <div class="start-menu-left">
        <input v-model="filterText" placeholder="Search apps" class="input-search vp-input" />
      </div>
      <div class="start-menu-right">
        <button v-if="systemStore.isBackendAvailable" class="vp-button" @click="doLogout">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-menu {
  width: 400px;
  //background-color: rgba(255, 255, 255, 0.8);
  //backdrop-filter: blur(10px);
  //box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 100%;
  user-select: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  .start-menu-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px;
    gap: 8px;
    .start-menu-left {
      flex: 1;
    }

    .start-menu-right {
      width: 150px;
      button {
        padding: 4px 10px;
        font-size: 14px;
      }
    }
  }

  .program-list {
    border: 1px solid;
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    min-height: 300px;
  }

  .shortcut-list {
    max-height: 400px;
    overflow: auto;
  }

  .shortcut-split {
    margin-top: 5px;
    margin-bottom: 5px;
    border-top: 1px solid $color_border;
  }

  .start-menu-bottom {
    border-top: 1px solid $color_border;
  }

  .input-search {
    box-sizing: border-box;
    width: 100%;
    font-size: 12px;
    padding: 3px 5px;
  }
}
</style>
