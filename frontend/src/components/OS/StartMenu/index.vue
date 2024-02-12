<script lang="ts">
import {defineComponent} from 'vue'
import StartMenuItem from '@/components/OS/StartMenu/StartMenuItem.vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import clickOutSide from '@/utils/directives/clickoutside'
import {AllAppList, SystemAppList} from '@/apps/app-list'

export default defineComponent({
  name: 'StartMenu',
  components: {StartMenuItem},
  directives: {clickOutSide},
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

    return {
      mVisible,
      systemStore,
      filterText,
      appListFiltered,
      SystemAppList,
      handleItemClick,
      handlePowerMenu() {
        mVisible.value = false
        systemStore.shutdown()
        window.close()

        // location.reload()
      },
      handleClickOutside(e) {
        // 防止重复点击弹出
        if (e.target.classList.contains('start-button')) {
          return
        }
        if (mVisible.value) {
          mVisible.value = false
        }
      },
    }
  },
})
</script>

<template>
  <div v-click-out-side="handleClickOutside" v-if="mVisible" class="start-menu vp-panel">
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
          <StartMenuItem
            :item="item"
            v-for="(item, index) in SystemAppList"
            :key="index"
            @click="handleItemClick(item)"
          />
        </div>
      </div>
    </div>
    <div class="start-menu-row start-menu-bottom">
      <div class="start-menu-left">
        <input v-model="filterText" placeholder="Search apps" class="input-search vp-input" />
      </div>
      <div class="start-menu-right">
        <button class="btn-no-style vp-button" @click="handlePowerMenu">Shutdown</button>
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
