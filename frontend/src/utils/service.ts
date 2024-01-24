import axios, {AxiosResponse} from 'axios'
// import {getBackendUserToken} from '@/utils/cookies'

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
      // if (isAuth) {
      //   const Authorization = getBackendUserToken()
      //   if (Authorization) {
      //     // @ts-ignore
      //     config.headers.Authorization = 'bearer ' + Authorization
      //   }
      // }

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

      // extract backend message
      if (response && response.data) {
        const {data} = response
        if (data.detail) {
          backendMessage = data.detail
        }
      }
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
