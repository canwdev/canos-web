import pkg from '../package.json'
import moment from 'moment/moment'
/**
 * 输出包版本信息
 */
// @ts-ignore
const timeDisplay = BUILD_TIMESTAMP ? moment(BUILD_TIMESTAMP).format('YYYY-MM-DD HH:mm:ss') : 'N/A'
console.info(
  `%c ${pkg.name} ${pkg.version} ${import.meta.env.MODE} %c ${timeDisplay} %c`,
  'background:#258292; border-radius: 3px 0 0 3px; padding:2px 0; color: #f9f9f9; font-size: 10px;',
  'background:#f9f9f9; border-radius: 0 3px 3px 0; padding:2px 0; color: #258292; font-size: 10px; font-weight: bold;',
  'background:transparent',
)
import momentDurationFormatSetup from 'moment-duration-format'
momentDurationFormatSetup(moment)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// https://pictogrammers.com/library/mdi/
import '@mdi/font/css/materialdesignicons.min.css'

import {createApp} from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from './router'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from '@/i18n/index'
import '@/apps/app-list'
import '@/components/CanUI/packages/ViewPortWindow/theme/index.scss'
import CanUI from '@/components/CanUI'
import './styles/style.scss'

const app = createApp(App)

app.use(i18n)
app.use(CanUI)
app.use(ElementPlus)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
