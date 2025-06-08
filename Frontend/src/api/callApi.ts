import axios from 'axios'
import { BaseApiProps } from '~/types'
import { TokenManager } from '~/utils/tokenManager'
import { API_URL } from '~/config/constants'
import optimizedApi from './optimizedApi'

const apiAxios = axios.create({
   baseURL: API_URL,
   withCredentials: true,
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
   const response = await apiAxios.request({
      url: apiPath,
      method,
      headers: headers ? headers : { 'Content-Type': 'application/json' },
      data: variables,
      params: method === 'get' ? variables : undefined,
   })
   return response.data
}

// Optimized API call with caching and performance monitoring
interface OptimizedApiProps extends BaseApiProps {
   cache?:
      | {
           ttl?: number
           key?: string
           invalidatePattern?: string
           enabled?: boolean
        }
      | false
   retry?: {
      attempts?: number
      delay?: number
   }
}

const callOptimizedApi = async ({ method, apiPath, variables, headers, cache, retry }: OptimizedApiProps) => {
   try {
      const config = {
         headers: headers ? headers : { 'Content-Type': 'application/json' },
         cache,
         retry,
      }

      switch (method?.toLowerCase()) {
         case 'get':
            return await optimizedApi.get(apiPath, { ...config, params: variables })
         case 'post':
            return await optimizedApi.post(apiPath, variables, config)
         case 'put':
            return await optimizedApi.put(apiPath, variables, config)
         case 'patch':
            return await optimizedApi.patch(apiPath, variables, config)
         case 'delete':
            return await optimizedApi.delete(apiPath, config)
         default:
            throw new Error(`Unsupported method: ${method}`)
      }
   } catch (error: any) {
      const status = error?.response?.status || 500
      return { status, ...error.response?.data }
   }
}

export default callApi
export { callOptimizedApi }
