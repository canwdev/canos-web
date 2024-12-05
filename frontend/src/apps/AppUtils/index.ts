import {ShortcutItem} from '@/enum/os'

export const defineDemoApp = ({title, component, iconClass}): ShortcutItem => {
  return {
    appid: title,
    title: title,
    iconClass: iconClass || 'mdi mdi-application-brackets-outline',
    winOptions: {
      top: '0px',
      left: '0px',
      width: '480px',
      height: '320px',
    },
    component,
    singleInstance: false,
  }
}
const defineWebApp = (title = 'WebApp', url): ShortcutItem => {
  return {
    appid: title,
    title,
    icon: 'applications-internet',
    winOptions: {
      top: '150px',
      left: '150px',
      width: '480px',
      height: '320px',
    },
    url,
    singleInstance: false,
  }
}

export const AppCalc: ShortcutItem = {
  appid: 'os.calc',
  title: 'Calculator',
  icon: 'accessories-calculator',
  winOptions: {
    width: '348px',
    height: '530px',
  },
  component: defineAsyncComponent(() => import('./SimpleCalculator.vue')),
  singleInstance: false,
}

export const AppStockTracker: ShortcutItem = {
  appid: 'com.canwdev.stock',
  title: 'Stock Tracker',
  iconClass: 'mdi mdi-chart-areaspline',
  winOptions: {
    width: '600px',
    height: '400px',
  },
  component: defineAsyncComponent(() => import('./StockTracker/index.vue')),
}

export const AppUtilsList = [
  AppCalc,
  AppStockTracker,
  defineDemoApp({
    title: '计数器',
    component: defineAsyncComponent(() => import('@/apps/AppUtils/SimpleCounter.vue')),
    iconClass: 'mdi mdi-counter',
  }),
  defineDemoApp({
    title: 'ObjectSize',
    component: defineAsyncComponent(() => import('@/apps/AppUtils/ObjectSizeWrap/index.vue')),
    iconClass: 'mdi mdi-move-resize',
  }),
  {
    appid: 'os.colorful-screen',
    title: '多彩屏幕 (屏幕坏点测试)',
    icon: 'video-display',
    winOptions: {
      width: '300px',
      height: '300px',
    },
    component: defineAsyncComponent(() => import('@/apps/AppUtils/ColorfulScreen.vue')),
  },
  {
    appid: 'os.wakelock',
    title: '唤醒锁定',
    icon: 'preferences-system-power',
    winOptions: {
      width: '428px',
      height: '200px',
    },
    component: defineAsyncComponent(() => import('@/apps/AppUtils/WakeLock.vue')),
    singleInstance: true,
  },
  defineWebApp('Google', 'https://www.google.com/webhp?igu=1'),
]
