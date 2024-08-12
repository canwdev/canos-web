import {App} from 'vue'
import AutoRatioBox from './packages/AutoRatioBox.vue'
import AutoRouterView from './packages/AutoRouterView.vue'
import VueRender from './packages/OptionUI/Tools/VueRender.vue'

const CanUI = {
  install(app: App) {
    // 插件逻辑
    // app.config.globalProperties.$myGlobalMethod = () => {
    //   console.log('这是我的全局方法');
    // };

    app.component('AutoRatioBox', AutoRatioBox)
    app.component('AutoRouterView', AutoRouterView)
    app.component('VueRender', VueRender)
  },
}

export default CanUI
