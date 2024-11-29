import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import pkg from '../../package.json'
import {LsKeys, PROXY_BASE_URL} from '@/enum'
import {useMainStore} from '@/store/main'
import {serverApi} from '@/api/server'
import {useSystemStore} from '@/store/system'
import {usersApi} from '@/api/users'
import {adminRoutes} from '@/router/admin'
import {ServerInfo} from '@server/types/server'
import {cryptKeyRef} from '@/utils/my-crypt'
import globalEventBus, {GlobalEvents} from '@/utils/bus'

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
      title: 'IP Address',
      skipLogin: true,
    },
  },
  {
    path: '/system32',
    redirect: '/system32/home',
    name: 'AdminRootView',
    component: () => import('@/views/Admin/Layout/AdminLayout.vue'),
    meta: {
      title: `Admin System`,
      breadcrumb: false,
    },
    children: [
      {
        path: 'home',
        name: 'AdminHome',
        component: () => import('@/views/Admin/AdminDashboard.vue'),
        meta: {
          title: `Home`,
        },
      },
      ...adminRoutes,
    ],
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Login',
      skipLogin: true,
    },
  },
  {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/PageNotFound.vue')},
]
const router = createRouter({history, routes})

router.beforeEach(async (to, from, next) => {
  const mainStore = useMainStore()
  const systemStore = useSystemStore()

  const {ck} = to.query
  if (ck) {
    cryptKeyRef.value = ck
  }
  delete to.query.ck

  // 检查服务器是否可用
  try {
    systemStore.serverInfo = (await serverApi.getHello()) as unknown as ServerInfo
    systemStore.isBackendAvailable = true
  } catch (e) {
    console.error(e)
    systemStore.isBackendAvailable = false
    return next()
  }

  const token = localStorage.getItem(LsKeys.LS_KEY_AUTHORIZATION_TOKEN)
  if (!to.meta?.skipLogin && !token) {
    return next({
      name: 'LoginPage',
      query: {
        // TODO: remove ck
        redirect: to.fullPath,
      },
    })
  }

  if (systemStore.isBackendAvailable && token) {
    try {
      mainStore.userInfo = await usersApi.userGetInfo()
      systemStore.serverInfo = (await serverApi.getServerInfo()) as unknown as ServerInfo
    } catch (e) {
      globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)

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
  const {query} = to

  // 检查并移除 ck query 参数
  if (query.ck) {
    const newQuery = {...query}
    delete newQuery.ck

    // 使用 replace 进行重定向，不保留在历史记录中
    router.replace({path: to.path, query: newQuery})
  }
})
export default router
