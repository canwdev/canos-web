import axios, {AxiosResponse} from 'axios'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {LsKeys} from '@/enum'

function Service(config: any) {
  const {
    baseURL,
    withCredentials = false,
    timeout,
    headers,
    isAuth = true,
    isToast = true,
    isRawResponse = false,
  } = config || {}

  // 创建 axios 实例
  const service = axios.create({
    baseURL,
    withCredentials, // send cookies when cross-domain requests
    timeout, // request timeout
    headers, // 请求头部
  })

  // 请求 拦截器
  service.interceptors.request.use(
    (config) => {
      // window.$loadingBar.start()
      if (isAuth) {
        const Authorization = localStorage.getItem(LsKeys.LS_KEY_AUTHORIZATION)
        if (Authorization) {
          // @ts-ignore
          config.headers.Authorization = 'Bearer ' + Authorization
        }
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // 响应 拦截器
  service.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (isRawResponse) {
        return response
      }
      let {data} = response

      // window.$loadingBar.finish()
      return data
    },
    (error) => {
      let message = error.message
      let backendMessage
      const {response} = error || {}

      if (response.status == 401) {
        // 未授权，请重新登录
        globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)
      }

      // extract backend message
      backendMessage = response?.data?.message
      if (isToast) {
        if (backendMessage) {
          window.$message.error(backendMessage)
        } else {
          window.$message.error(message)
        }
      }
      // window.$loadingBar.error()
      return Promise.reject(error)
    }
  )

  return service
}

export default Service
