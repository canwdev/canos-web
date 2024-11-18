<script setup lang="ts">
import {useSystemStore} from '@/store/system'
import {useQRCode} from '@vueuse/integrations/useQRCode'

const systemStore = useSystemStore()
const currentUrl = ref(location.href)

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
    <div class="ip-chooser-main vp-bg font-code" v-if="systemStore.serverInfo">
      <div class="left-box">
        <div
          v-for="url in systemStore.serverInfo.hostUrls"
          @click="currentUrl = url"
          class="list-item"
          :class="{active: url === currentUrl}"
        >
          {{ url }}
          <button class="btn-go btn-no-style" @click="handleGo(url)">🔗</button>
        </div>
      </div>
      <div class="right-box">
        <div class="qr-img-wrap">
          <img :src="qrcode" class="qr-img" />
          <div class="url-text">
            <input class="vp-input" v-model="currentUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ip-chooser {
  height: 100%;
  overflow: auto;
  padding: 50px 20px;
  box-sizing: border-box;

  .ip-chooser-main {
    max-width: 800px;
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
      border: 1px solid $color_border;

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
      padding: 30px 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      .qr-img-wrap {
        .qr-img {
          width: 260px;
          height: 260px;
          display: block;
        }

        .url-text {
          margin-top: 8px;
          text-align: center;
          input {
            width: 100%;
            text-align: center;
            line-height: 1;
          }
        }
      }
    }
  }
}
</style>
