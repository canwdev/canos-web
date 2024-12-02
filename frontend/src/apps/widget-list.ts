import {ShortcutItem} from '@/enum/os'

export const allWidgetList: ShortcutItem[] = [
  {
    appid: 'widgets.screen-clock',
    title: 'Screen Clock',
    iconClass: 'mdi mdi-clock-outline',
    winOptions: {
      width: '300px',
      height: '300px',
    },
    component: defineAsyncComponent(() => import('@/apps/widgets/ScreenClock/index.vue')),
  },
  {
    appid: 'widgets.live-2d',
    title: 'Live2D',
    iconClass: 'mdi mdi-face-man-shimmer',
    winOptions: {
      width: '300px',
      height: '600px',
    },
    component: defineAsyncComponent(() => import('@/apps/widgets/Live2DWrap/index.vue')),
  },
  {
    appid: 'widgets.bouncy-ball',
    title: 'Bouncy Ball',
    iconClass: 'mdi mdi-basketball',
    winOptions: {
      width: '300px',
      height: '200px',
    },
    component: defineAsyncComponent(() => import('@/apps/widgets/BouncyBall/index.vue')),
  },
]
