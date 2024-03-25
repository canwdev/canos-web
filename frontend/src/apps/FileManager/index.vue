<script setup lang="ts">
import {
  ArrowSync20Filled,
  ArrowUp20Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  Star20Filled,
  Star20Regular,
} from '@vicons/fluent'
import FileSidebar from './FileSidebar.vue'
import {fsWebApi} from '@/api/filesystem'
import FileList from './ExplorerUI/FileList.vue'
import {getLastDirName, normalizePath, toggleArrayElement} from './utils'
import {useNavigation} from './utils/use-navigation'

const {
  isLoading,
  filteredFiles,
  handleOpen,
  handleRefresh,
  basePathNormalized,
  starList,
  handleOpenPath,
  backHistory,
  goBack,
  forwardHistory,
  goForward,
  allowUp,
  goUp,
  basePath,
  toggleStar,
  isStared,
  filterText,
} = useNavigation({
  getListFn: async () => {
    const res = await fsWebApi.getList({
      path: basePath.value,
    })
    console.log(res)

    return res
  },
})
</script>

<template>
  <div class="explorer-wrap">
    <div class="explorer-header vp-panel">
      <div class="nav-address">
        <div class="nav-wrap">
          <button
            :disabled="backHistory.length <= 1"
            class="btn-action vp-button"
            @click="goBack"
            title="Back"
          >
            <n-icon size="16">
              <ArrowLeft20Regular />
            </n-icon>
          </button>
          <button
            :disabled="forwardHistory.length <= 0"
            class="btn-action vp-button"
            @click="goForward"
            title="Forward"
          >
            <n-icon size="16">
              <ArrowRight20Regular />
            </n-icon>
          </button>
          <button class="btn-action vp-button" :disabled="!allowUp" @click="goUp" title="Up">
            <n-icon size="16">
              <ArrowUp20Regular />
            </n-icon>
          </button>
        </div>
        <div class="input-wrap">
          <input
            placeholder="Path"
            v-model="basePath"
            class="input-addr vp-input"
            @change="handleRefresh"
          />
          <button class="vp-button btn-action" @click="handleRefresh">
            <n-icon size="16"><ArrowSync20Filled /> </n-icon>
          </button>
          <button class="vp-button btn-action" @click="toggleStar">
            <n-icon size="16">
              <Star20Filled v-if="isStared" />
              <Star20Regular v-else />
            </n-icon>
          </button>

          <input placeholder="Filter name" v-model="filterText" class="input-filter vp-input" />
        </div>
      </div>

      <div v-if="starList.length" class="star-list">
        <div v-for="path in starList" :key="path">
          <button @click="handleOpenPath(path)" class="vp-button" :title="path">
            {{ getLastDirName(path) }}
          </button>
        </div>
      </div>
    </div>
    <div class="explorer-content-wrap _scrollbar_mini">
      <FileSidebar @openDrive="(i) => handleOpenPath(i.path)" :current-path="basePath" />
      <FileList
        v-model:is-loading="isLoading"
        :files="filteredFiles"
        @open="handleOpen"
        @refresh="handleRefresh"
        :base-path="basePathNormalized"
      />
    </div>
  </div>
</template>

<style lang="scss">
.explorer-wrap {
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .explorer-header {
    padding: 4px;
    border: none;
    border-bottom: 1px solid $color_border;
    box-shadow: none;
    border-radius: 0;

    .nav-address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 4px;
      .btn-action {
        padding: 4px;
      }

      .nav-wrap {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .input-wrap {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        gap: 4px;

        .input-addr {
          flex: 1;
          line-height: 1;
        }
        .input-filter {
          width: 100px;
          line-height: 1;
        }
      }
    }

    .star-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
  }
  .explorer-content-wrap {
    flex: 1;
    overflow: auto;
    display: flex;
  }

  .btn-action {
    display: inline-flex;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
