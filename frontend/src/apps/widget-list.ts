import {ShortcutItem} from '@/enum/os'

export const allWidgetList: ShortcutItem[] = [
  {
    appid: 'widgets.screen-clock',
    title: 'Screen Clock',
    icon: 'exe',
    winOptions: {
      width: '300px',
      height: '300px',
    },
    component: defineAsyncComponent(() => import('@/apps/widgets/ScreenClock/index.vue')),
  },
  {
    appid: 'widgets.live-2d',
    title: 'Live2D',
    icon: 'exe',
    winOptions: {
      width: '300px',
      height: '600px',
    },
    component: defineAsyncComponent(() => import('@/apps/widgets/Live2DWrap/index.vue')),
  },
]
