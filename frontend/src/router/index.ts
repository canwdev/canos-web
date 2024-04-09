import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import pkg from '../../package.json'
import {LsKeys} from '@/enum'
import {useMainStore} from '@/store/main'
import {serverApi} from '@/api/server'
import {useSystemStore} from '@/store/system'
import {usersApi} from '@/api/users'

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      title: ``,
    },
  },
  {
    path: '/ip',
    name: 'IpChooserView',
    component: () => import('@/views/IpChooser.vue'),
    meta: {
      skipLogin: true,
    },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/Login.vue'),
    meta: {
      skipLogin: true,
    },
  },
  {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/PageNotFound.vue')},
]
const router = createRouter({history, routes})
router.beforeEach(async (to, from, next) => {
  const mainStore = useMainStore()
  const systemStore = useSystemStore()

  // 检查服务器是否可用
  try {
    systemStore.serverInfo = await serverApi.getServerInfo()
    systemStore.isBackendAvailable = true
  } catch (e) {
    console.log(e)
    systemStore.isBackendAvailable = false
    return next()
  }

  const token = localStorage.getItem(LsKeys.LS_KEY_AUTHORIZATION)
  if (!to.meta?.skipLogin && !token) {
    return next({
      name: 'LoginPage',
    })
  }

  if (systemStore.isBackendAvailable && token) {
    try {
      mainStore.userInfo = await usersApi.userGetInfo()
    } catch (e) {
      return next({
        name: 'LoginPage',
      })
    }
  }
  return next()
})

export const formatSiteTitle = (t?: string) => {
  const title = `CanOS Web v${pkg.version}`
  if (!t) {
    return title
  }
  return `${t} - ${title}`
}

router.afterEach((to, _, failure) => {
  document.title = formatSiteTitle(to?.meta?.title as string)
})
export default router
