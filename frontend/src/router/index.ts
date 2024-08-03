import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import pkg from '../../package.json'
import {LsKeys, PROXY_BASE_URL} from '@/enum'
import {useMainStore} from '@/store/main'
import {serverApi} from '@/api/server'
import {useSystemStore} from '@/store/system'
import {usersApi} from '@/api/users'
import {adminRoutes} from '@/router/admin'

// const history = createWebHashHistory()
const history = createWebHistory(PROXY_BASE_URL)

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
    path: '/system32',
    name: 'AdminRootView',
    component: () => import('@/views/Admin/AdminLayout.vue'),
    meta: {
      title: `Admin System`,
    },
    children: adminRoutes,
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
      query: {
        redirect: to.fullPath,
      },
    })
  }

  if (systemStore.isBackendAvailable && token) {
    try {
      mainStore.userInfo = await usersApi.userGetInfo()
    } catch (e) {
      return next({
        name: 'LoginPage',
        query: {
          redirect: to.fullPath,
        },
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
