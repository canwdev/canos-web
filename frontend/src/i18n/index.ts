import {createI18n} from 'vue-i18n' // import from runtime only

import enUS from '@/i18n/locales/en-US/index.json'
import zhCN from '@/i18n/locales/zh-CN/index.json'

export const autoGetLocale = () => {
  const locale = navigator.language
  if (/^zh/i.test(locale)) {
    return 'zh-CN'
  }

  // Default language
  return 'en'
}

const i18n = createI18n({
  locale: autoGetLocale(),
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: enUS,
    'zh-CN': zhCN,
  },
})

export default i18n
