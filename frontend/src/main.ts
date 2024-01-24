import {createApp} from 'vue'
import App from './App.vue'
import {create} from 'naive-ui'
import './styles/style.scss'
import 'normalize.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/components/CommonUI/ViewPortWindow/theme/index.scss'
import router from './router'
import {createPinia} from 'pinia'
const naive = create({})
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from '@/i18n/index'
import AutoRatioBox from '@/components/CommonUI/AutoRatioBox.vue'

const app = createApp(App)

app.component(AutoRatioBox.name, AutoRatioBox)

app.use(i18n)
app.use(naive)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
