import {Ref} from 'vue'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import QrCodeDisplay from './QrCodeDisplay.vue'

export const qLogicQrCode = (valRef: Ref<string>): QuickOptionItem => {
  return {
    label: '🤳 QR Code Toolbox',
    search: 'qrcode',
    children: [
      {
        label: 'text to QR Code',
        render: h(QrCodeDisplay, {text: valRef}),
      },
    ],
  }
}
