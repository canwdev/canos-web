<script lang="ts">
export default {
  name: 'StartMenu',
}
</script>

<script lang="ts" setup>
import MenuListItem from '@/components/OS/StartMenu/MenuListItem.vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {onClickOutside, useFullscreen} from '@vueuse/core'
import {useSettingsStore} from '@/store/settings'
import StartActions from '@/components/OS/StartMenu/Sub/StartActions.vue'
import StartScreen from '@/components/OS/StartMenu/StartScreen.vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
  }>(),
  {
    visible: true,
  },
)
const emit = defineEmits(['update:visible'])

const mVisible = useModelWrapper(props, emit, 'visible')
const systemStore = useSystemStore()
const settingsStore = useSettingsStore()

const filterText = ref('')

const handleItemClick = (item: ShortcutItem) => {
  mVisible.value = false

  systemStore.createTaskById(item.appid)
}

const appListFiltered = computed(() => {
  return systemStore.allApps
})

const rootRef = ref()

onClickOutside(rootRef, (event) => {
  if (mVisible.value) {
    setTimeout(() => {
      mVisible.value = false
    })
  }
})

const startApp = (appId) => {
  mVisible.value = false
  systemStore.createTaskById(appId)
}

const isAllApps = ref(false)
</script>

<template>
  <div
    ref="rootRef"
    v-if="mVisible"
    class="start-menu vp-panel vp-window-panel _panel-bg"
    :class="{_full: !settingsStore.isWindowed}"
  >
    <div class="start-menu-row">
      <div class="start-menu-above">
        <div class="start-title-wrap">
          <div class="start-title">Start</div>
          <button class="btn-no-style" @click="isAllApps = !isAllApps">All apps »</button>
        </div>
        <div class="start-main-wrap">
          <transition-group name="fade-left">
            <div v-if="isAllApps" class="all-apps-list">
              <MenuListItem
                :item="item"
                v-for="(item, index) in appListFiltered"
                :key="index"
                @click="handleItemClick(item)"
                :disabled="item.requireBackend && !systemStore.isBackendAvailable"
              />
            </div>
            <StartScreen v-else @onCreateTask="mVisible = false" />
          </transition-group>
        </div>
      </div>
      <div class="start-actions-wrap">
        <StartActions @startApp="startApp" @actionOpened="mVisible = false" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-menu {
  width: 340px;
  //background-color: rgba(255, 255, 255, 0.8);
  //backdrop-filter: blur(10px);
  //box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: $taskbar_height;
  user-select: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &:not(&._full) {
    left: 8px;
    bottom: $taskbar_height + 8px;
    .start-main-wrap {
      height: 40vh;
    }
    .start-screen {
    }
  }

  &._full {
    width: 100%;
    border: none;
    border-radius: 0;
    top: 0;
    box-shadow: none !important;
    .start-menu-row,
    .start-menu-above,
    .start-main-wrap {
      height: 100%;
    }

    .start-main-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;

      .all-apps-list {
        flex: 1;
        max-height: 100%;
      }
    }
  }

  .start-menu-row {
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    box-sizing: border-box;
    .start-menu-above {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .start-main-wrap {
    min-height: 300px;
    border-bottom: 1px solid $color_border;
    position: relative;
  }

  .all-apps-list {
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .start-actions-wrap {
    display: flex;
    justify-content: center;
  }

  .start-screen {
    position: absolute;
    top: 0;
    left: 0;
  }

  .start-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
    width: 100%;
    max-width: 1200px;
    flex-wrap: wrap;

    .start-title {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
