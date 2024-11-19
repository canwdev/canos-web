<script setup lang="ts">
import {useSystemStore} from '@/store/system'
import {useQRCode} from '@vueuse/integrations/useQRCode'
import {copyWithToast} from '@/utils'

const systemStore = useSystemStore()
const currentUrl = ref('')

const qrcode = useQRCode(currentUrl, {
  errorCorrectionLevel: 'H',
  margin: 2,
})

const handleGo = (url) => {
  location.href = url
}
</script>

<template>
  <div class="ip-chooser">
    <template v-if="systemStore.serverInfo">
      <div class="ip-title">
        <RouterLink :to="{name: 'HomeView'}">
          <span class="mdi mdi-home"></span>
        </RouterLink>
        Welcome to {{ systemStore.serverInfo?.name }}!
      </div>
      <div class="ip-title">
        <span class="mdi mdi-ip-network"></span>
        Select an IP address to access:
      </div>
      <div class="ip-chooser-main vp-bg font-code">
        <div class="left-box">
          <div
            v-for="url in systemStore.serverInfo.hostUrls"
            @click="currentUrl = url"
            class="list-item"
            :class="{active: url === currentUrl}"
          >
            {{ url }}
            <button class="btn-go btn-no-style" @click="copyWithToast(url)">
              <span class="mdi mdi-content-copy"></span>
            </button>
            <button class="btn-go btn-no-style" @click="handleGo(url)">
              <span class="mdi mdi-open-in-new"></span>
            </button>
          </div>
        </div>
        <div class="right-box">
          <div class="qr-img-wrap">
            <img v-if="qrcode && currentUrl" :src="qrcode" class="qr-img" />
            <div class="url-text">
              <textarea
                class="vp-input"
                v-model="currentUrl"
                placeholder="Select the URL on the left or input"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="ip-chooser-main vp-panel" style="padding: 10px 20px" v-else>
      Backend server not available. <a href="">Reload</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ip-chooser {
  height: 100%;
  overflow: auto;
  padding: 50px 20px;
  box-sizing: border-box;

  .ip-title {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 16px;
    font-style: italic;
  }

  .ip-chooser-main {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border: 1px solid $primary;
    box-shadow: 0 0 10px $primary_opacity;
    flex-wrap: wrap;

    .left-box {
      width: 300px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid $color_border;

      @media screen and (max-width: 500px) {
        width: 100%;
        border-right: 0;
        border-bottom: 1px solid $color_border;
      }

      .list-item {
        padding: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        word-break: break-all;

        &:nth-child(2n) {
          background-color: $color_border;
        }

        &:hover {
          background-color: $color_hover;
        }

        &.active {
          position: relative;
          background-color: $primary_opacity;

          &::before {
            position: absolute;
            display: block;
            content: '';
            right: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background-color: $primary;
          }
        }
      }
    }

    .right-box {
      flex: 1;
      padding: 50px 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      .qr-img-wrap {
        .qr-img {
          width: 260px;
          height: 260px;
          display: block;
          border-radius: 4px;
        }

        .url-text {
          margin-top: 8px;
          text-align: center;
          .vp-input {
            font-size: 14px;
            width: 100%;
            line-height: 1;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>
