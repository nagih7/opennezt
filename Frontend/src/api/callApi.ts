import axios from 'axios'
import { BaseApiProps } from '~/types'
import { TokenManager } from '~/utils/tokenManager'

const apiAxios = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
   headers: { 'Content-Type': 'application/json' },
})

apiAxios.interceptors.request.use(
   (config) => {
      const token = TokenManager.getUserToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
   },
   (error) => Promise.reject(error)
)

const callApi = async ({ method, apiPath, variables, headers }: BaseApiProps) => {
   // try {
   // const response = await apiAxios.request({
   //    url: apiPath,
   //    method,
   //    headers,
   //    data: variables,
   //    params: method === 'get' ? variables : undefined,
   // })
   // return response.data
   // } catch (error: any) {
   //    const status = error?.response?.status || 500
   //    return { status, ...error.response.data }
   // }

   const response = await apiAxios.request({
      url: apiPath,
      method,
      headers,
      data: variables,
      params: method === 'get' ? variables : undefined,
   })
   return response.data
}

export default callApi
