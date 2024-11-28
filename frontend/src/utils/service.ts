import axios, {AxiosResponse} from 'axios'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {HOST_URL, LsKeys} from '@/enum'
import {feDecryptResponse, feEncryptRequest, myApiEncrypt} from '@/utils/my-crypt'

export const getToken = () => {
  const Authorization = localStorage.getItem(LsKeys.LS_KEY_AUTHORIZATION_TOKEN)
  if (Authorization) {
    return 'Bearer ' + Authorization
  }
}

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

  const refreshToken = async () => {
    return await service.post(
      '/auth/refresh',
      {
        // 加密发送
        refreshToken: myApiEncrypt.encrypt(localStorage.getItem(LsKeys.LS_KEY_REFRESH_TOKEN) || ''),
      },
      {
        baseURL: HOST_URL + '/api/users',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  // 请求 拦截器
  service.interceptors.request.use(
    (config) => {
      // window.$loadingBar.start()
      if (isAuth) {
        config.headers.Authorization = getToken()
      }

      // 加密请求
      feEncryptRequest(config)
      return config
    },
    (error) => Promise.reject(error),
  )

  // 响应 拦截器
  service.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (isRawResponse) {
        return response
      }
      feDecryptResponse(response)
      const {data} = response

      // window.$loadingBar.finish()
      return data
    },
    async (error) => {
      const message = error.message
      const {response} = error || {}

      // 处理 401 未授权错误（可能是 token 过期）
      if (response.status == 401) {
        try {
          console.log('[401] Authorization token 已过期，尝试刷新')

          localStorage.removeItem(LsKeys.LS_KEY_AUTHORIZATION_TOKEN)

          // 尝试使用刷新 Token 获取新的授权 Token
          const {authorizationToken} = (await refreshToken()) as unknown as {
            authorizationToken: string
          }

          // 更新 authorization token
          localStorage.setItem(LsKeys.LS_KEY_AUTHORIZATION_TOKEN, authorizationToken)

          // 重新发起原始请求
          return service({
            ...error.config,
            // 防止重复加密
            skipEncrypt: true,
          })
        } catch (refreshError) {
          // 刷新 Token 失败，退出登录
          console.warn('刷新 Token 失败，退出登录')
          globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)
          return Promise.reject(refreshError)
        }
      }

      // extract backend message
      const backendMessage = response?.data?.message
      console.log('[backendMessage]', backendMessage)
      if (isToast) {
        if (backendMessage) {
          window.$message.error(backendMessage)
        } else {
          window.$message.error(message)
        }
      }
      // window.$loadingBar.error()
      return Promise.reject(error)
    },
  )

  return service
}

export default Service
