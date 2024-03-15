<script lang="ts" setup>
import {useQRCode} from '@vueuse/integrations/useQRCode'

interface Props {
  text: any
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
})

const {text} = toRefs(props)

// `qrcode` will be a ref of data URL
const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  margin: 2,
})
</script>

<template>
  <div class="qr-code-display">
    <img v-if="text" :src="qrcode" :alt="text" />
    <span v-else>Input text to generate QR code</span>
  </div>
</template>

<style lang="scss">
.qr-code-display {
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
