import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import pkg from '../../package.json'

let history = createWebHashHistory()
let routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      title: ``,
    },
  },
]
const router = createRouter({history, routes})

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
