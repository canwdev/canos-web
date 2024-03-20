<script lang="ts">
import {defineComponent} from 'vue'
import CoverDisplay from '@/apps/MusicPlayer/CoverDisplay.vue'
import musicBus, {MusicEvents} from '@/apps/MusicPlayer/utils/bus'
import {useMusicStore} from '@/apps/MusicPlayer/utils/music-state'

const DetailTabEnum = {
  LYRIC: 'LYRIC',
  METADATA: 'METADATA',
}

export default defineComponent({
  name: 'MusicDetail',
  components: {
    CoverDisplay,
  },
  data() {
    return {
      currentDetailTab: DetailTabEnum.LYRIC,
      DetailTabEnum,
      detailTabList: [
        {label: this.$t('lyric'), value: DetailTabEnum.LYRIC},
        {label: this.$t('metadata'), value: DetailTabEnum.METADATA},
      ],
      isShowDetail: false,
      isShowLyricSearch: false,
      isLyricLock: false,
      lyricObj: null, // TODO: lyric
      isShowPlaybackRate: false,
      isShowCountdownConfig: false,
    }
  },
  setup() {
    const musicStore = useMusicStore()
    return {
      musicStore,
      musicItem: computed(() => musicStore.musicItem),
      jumpForward() {
        musicBus.emit(MusicEvents.ACTION_CHANGE_CURRENT_TIME, (musicStore.currentTime += 5))
      },
      jumpBackward() {
        musicBus.emit(MusicEvents.ACTION_CHANGE_CURRENT_TIME, (musicStore.currentTime -= 5))
      },
      handlePlaybackRateChange(val) {
        musicStore.playbackRate = Number(val)
      },
    }
  },
})
</script>

<template>
  <div v-if="musicItem" class="music-detail">
    <AutoRatioBox class="cover-wrap-box">
      <div class="cover-wrap">
        <CoverDisplay
          class="big-cover"
          :src="musicItem.cover"
          :is-rotating="false"
          :is-rounded="false"
          :is-show-icon="false"
          @click="isShowDetail = true"
        />
        <transition name="fade">
          <div v-show="isShowDetail" class="detail-content bg-dark">
            <div class="tab-wrap">
              <button
                v-for="item in detailTabList"
                :key="item.value"
                :class="{active: currentDetailTab === item.value}"
                @click="currentDetailTab = item.value"
                class="btn-no-style"
              >
                {{ item.label }}
              </button>
            </div>

            <div v-show="currentDetailTab === DetailTabEnum.LYRIC" class="lyric-content">
              <div class="lyric-lock">
                <button
                  class="btn-no-style"
                  :title="$t('search-lyric')"
                  @click="isShowLyricSearch = true"
                >
                  <i class="material-icons">search</i>
                </button>

                <button
                  class="btn-no-style"
                  :title="$t('lock-lyric')"
                  @click="isLyricLock = !isLyricLock"
                >
                  <i class="material-icons">
                    {{ isLyricLock ? 'lock' : 'lock_open' }}
                  </i>
                </button>
              </div>

              <!--              <div-->
              <!--                v-if="lyricObj && lyricObj.lines"-->
              <!--                class="lrc-main"-->
              <!--                :class="{unlocked: !isLyricLock}"-->
              <!--              >-->
              <!--                <div class="lrc-scroll-wrap">-->
              <!--                  <p-->
              <!--                    v-for="(line, index) in lyricObj.lines"-->
              <!--                    :key="index"-->
              <!--                    :class="{active: lyricCurrentLine === index}"-->
              <!--                    :data-index="index"-->
              <!--                  >-->
              <!--                    {{ line.txt }}-->
              <!--                  </p>-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="lrc-main no-lyric" @click="isShowDetail = false">
                {{ $t('msg.no-lyric') }} TBD
              </div>
            </div>
            <textarea
              v-show="currentDetailTab === DetailTabEnum.METADATA"
              class="metadata"
              cols="30"
              rows="15"
              readonly
              :value="JSON.stringify(musicItem, null, 2)"
              :placeholder="$t('msg.no-data')"
            ></textarea>
          </div>
        </transition>
      </div>
    </AutoRatioBox>

    <div class="below-wrap">
      <div
        class="titles-wrap"
        :class="{opacity: isShowDetail}"
        @click="isShowDetail = !isShowDetail"
      >
        <div class="title">{{ musicItem.titleDisplay }}</div>
        <div class="subtitle">{{ musicItem.artisDisplay }}</div>
        <div class="subtitle">{{ musicItem.album }}</div>
      </div>

      <div class="actions-wrap">
        <button class="btn-no-style" @click="jumpBackward">
          <i class="material-icons">replay_5</i>
          <!--          SkipBack1020Regular-->
        </button>

        <button
          class="btn-no-style"
          :title="$t('playback-speed')"
          @click="isShowPlaybackRate = true"
        >
          <i class="material-icons">speed</i>
        </button>
        <!--        <button-->
        <!--          class="btn-no-style"-->
        <!--          :class="{active: stopCountdown}"-->
        <!--          :title="$t('countdown')"-->
        <!--          @click="isShowCountdownConfig=true"-->
        <!--        >-->
        <!--          <i class="material-icons">timer</i>-->
        <!--        </button>-->
        <button class="btn-no-style" @click="jumpForward">
          <i class="material-icons">forward_5</i>
        </button>
      </div>
    </div>

    <n-modal
      v-model:show="isShowPlaybackRate"
      preset="dialog"
      :show-icon="false"
      :title="$t('playback-speed')"
    >
      <n-space align="center">
        <n-button @click="handlePlaybackRateChange(1)">重置</n-button>

        <n-slider
          style="width: 200px"
          v-model:value="musicStore.playbackRate"
          @update:value="handlePlaybackRateChange(musicStore.playbackRate)"
          step="marks"
          :max="2"
          :min="0.2"
          :marks="{[0.2]: '0.2', [0.5]: '0.5', 1: '1', [1.2]: '1.2', [1.5]: '1.5', 2: '2'}"
        />
      </n-space>
    </n-modal>

    <n-modal
      v-model:show="isShowLyricSearch"
      preset="dialog"
      :show-icon="false"
      title="Search Lyric"
      >TBD
      <!--      <LyricSearch-->
      <!--        :search="musicItem.filenameDisplay"-->
      <!--        :current-lyric="musicItem.lyric"-->
      <!--        @saveLyric="handleSaveLyric"-->
      <!--      />-->
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>
.music-detail {
  width: 100%;
  text-align: center;
  user-select: text;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;

  .below-wrap {
    min-height: 100px;
  }

  .titles-wrap {
    &.opacity {
      opacity: 0.8;
      cursor: pointer;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 14px;
      margin-bottom: 4px;
    }
  }

  .actions-wrap {
    user-select: none;
    margin-top: 8px;

    button {
      &.active {
        color: $primary;
      }
    }

    button + button {
      margin-left: 10px;
    }
  }

  .cover-wrap-box {
    margin: 0 auto 20px;
    max-width: 300px;
  }

  .cover-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 1px $color_border;
    overflow: hidden;

    .big-cover {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: inherit;
      overflow: hidden;
    }

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
  }

  .detail-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: inherit;

    .tab-wrap {
      display: flex;
      font-size: 12px;

      button {
        flex: 1;
        padding: 10px 0;
        font-weight: bold;
        border-bottom: 1px solid $color_border;
        border-radius: 0;

        &.active {
          color: $primary;
          border-width: 2px;
          border-bottom-color: $primary;
        }
      }
    }

    .metadata {
      padding: 5px;
      flex: 1;
      width: 100%;
      font-size: 12px;
      font-family: monospace;
      resize: none;
      box-sizing: border-box;
      background: transparent;
      outline: none;
      border: none;
    }

    .lyric-lock {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 18px;
      opacity: 0.6;
      z-index: 10;

      i {
        font-size: inherit;
      }

      button {
        margin-left: 5px;
      }
    }

    .lyric-content {
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    .lrc-main {
      height: 100%;
      position: relative;

      &.unlocked {
        .lrc-scroll-wrap {
          & > p {
            opacity: 1;

            &.active {
              text-decoration: underline;
            }
          }
        }
      }

      .lrc-scroll-wrap {
        height: 100%;
        width: 100%;
        overflow: auto;
        padding: 0 5px;
        box-sizing: border-box;
        scroll-behavior: smooth;

        & > p {
          margin: 10px 0 10px 0;
          text-align: center;
          line-height: 1.3;
          opacity: 0.6;
          transition: all 0.3s;

          &.active {
            opacity: 1;
          }
        }
      }

      &.no-lyric {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
      }
    }
  }
}
</style>
