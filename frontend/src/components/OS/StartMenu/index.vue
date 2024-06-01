<script setup lang="ts">
import {defineComponent} from 'vue'
import StartMenuItem from '@/components/OS/StartMenu/StartMenuItem.vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {onClickOutside, useFullscreen, useStorage} from '@vueuse/core'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {useSettingsStore} from '@/store/settings'
import {serverApi} from '@/api/server'
import StartActions from '@/components/OS/StartMenu/StartActions.vue'
import {
  StartItemSizeOptions,
  StartLayoutGroup,
  StartLayoutItem,
} from '@/components/OS/StartMenu/types'
import QuickContextMenu from '@/components/CommonUI/QuickOptions/utils/QuickContextMenu.vue'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import {LsKeys} from '@/enum'

interface Props {
  visible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
})
const emit = defineEmits(['update:visible'])

const mVisible = useModelWrapper(props, emit, 'visible')
const systemStore = useSystemStore()
const settingsStore = useSettingsStore()

const filterText = ref('')

const handleItemClick = (item: ShortcutItem) => {
  mVisible.value = false
  systemStore.createTask(item)
}
const startApp = (appId) => {
  mVisible.value = false
  systemStore.createTaskById(appId)
}

const appListFiltered = computed((): ShortcutItem[] => {
  return systemStore.allApps
})
const appIdMapped = computed(() => {
  const map: {[key: string]: ShortcutItem} = {}
  appListFiltered.value.forEach((item) => {
    map[item.appid] = item
  })

  return map
})

const rootRef = ref()

onClickOutside(rootRef, (event) => {
  if (mVisible.value) {
    setTimeout(() => {
      mVisible.value = false
    })
  }
})

const startLayoutColumns = useStorage<StartLayoutGroup[][]>(LsKeys.START_MENU_LAYOUT, [])
const resetStartLayout = () => {
  startLayoutColumns.value = [
    [
      {
        title: 'System',
        children: appListFiltered.value.map((shortcutItem, index) => {
          return {
            id: shortcutItem.appid,
            shortcutItem,
            size: index === 0 ? 'md' : 'sm',
          }
        }),
      },
      // {title: 'BBB', children: []},
    ],
    // [{title: 'CCC', children: []}],
  ]
}
onMounted(() => {
  if (!startLayoutColumns.value.length) {
    resetStartLayout()
  }
})

const ctxMenuRef = ref()
const editingMenuItem = ref<StartLayoutItem>()
const handleShowCtxMenu = (event, menuItem: StartLayoutItem) => {
  editingMenuItem.value = menuItem
  ctxMenuRef.value.isShow = false
  setTimeout(() => {
    ctxMenuRef.value.showMenu(event)
  })
}

const ctxMenuOptions = computed((): QuickOptionItem[] => {
  if (!editingMenuItem.value) {
    return []
  }
  return [
    // {
    //   label: 'Change Size',
    //   children: [],
    // },
    ...StartItemSizeOptions.map((item) => {
      return {
        label: item.label,
        props: {
          onClick: () => {
            editingMenuItem.value.size = item.value
          },
        },
      }
    }),
  ]
})
</script>

<template>
  <div ref="rootRef" v-show="mVisible" class="start-screen">
    <div class="start-above">
      <div class="start-title">Start</div>
      <StartActions @startApp="startApp" @resetStart="resetStartLayout" />
    </div>
    <div class="start-content">
      <div v-for="(groups, index) in startLayoutColumns" :key="index" class="app-col">
        <div v-for="(group, index2) in groups" :key="index2" class="app-group">
          <div class="group-title">{{ group.title }}</div>
          <div class="group-content">
            <StartMenuItem
              class="card-item"
              :menuItem="menuItem"
              :shortcutItem="appIdMapped[menuItem.id]"
              v-for="(menuItem, index) in group.children"
              :key="index"
              :class="[menuItem.size]"
              @click="handleItemClick(appIdMapped[menuItem.id])"
              @contextmenu.prevent="handleShowCtxMenu($event, menuItem)"
              :disabled="appIdMapped[menuItem.id].requireBackend && !systemStore.isBackendAvailable"
            />
          </div>
        </div>
      </div>

      <QuickContextMenu :options="ctxMenuOptions" ref="ctxMenuRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-screen {
  position: fixed;
  top: 0;
  bottom: $taskbar_height;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.834);
  color: white;
  font-family: 'Segoe UI Light';
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 20px;
  box-sizing: border-box;

  .start-above {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    line-height: 1;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    flex-wrap: wrap;

    .start-title {
      font-size: 45px;
    }
  }

  .start-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 40px;

    .app-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 40px;

      .app-group {
        min-width: 300px;

        .group-title {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .group-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto;
          gap: 8px;

          .card-item {
            background: $primary;
            transition: all 0.2s;

            &.md {
              grid-column: span 2;
              grid-row: span 2;
              background-color: rgb(133, 63, 163);
            }

            &.lg {
              grid-column: span 4;
              background-color: rgb(163, 100, 63);
            }

            &.xl {
              grid-column: span 4;
              background-color: rgb(65, 163, 63);
            }

            &:hover,
            &:active {
              outline: 2px solid white;
            }

            &:active {
              transform: scale(0.9);
            }
          }
        }
      }
    }
  }
}
</style>
