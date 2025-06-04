import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { isFunction } from 'lodash'
import { AnyAction, Dispatch } from 'redux'
import { TokenManager } from '~/utils/tokenManager'
import { API_URL } from '~/config/constants/env'

// Define interfaces for API call parameters
export interface CallApiProps {
   method: 'get' | 'post' | 'put' | 'delete' | 'patch'
   apiPath: string
   actionTypes: [() => AnyAction, (data: any) => AnyAction, (error: any) => AnyAction]
   variables?: any
   dispatch: Dispatch
   getState: () => any
   headers?: Record<string, string>
}

export interface CallApiSimpleProps {
   method: 'get' | 'post' | 'put' | 'delete' | 'patch'
   apiPath: string
   variables?: any
   headers?: Record<string, string>
}

export interface ApiResponse<T = any> {
   success: boolean
   data?: T
   error?: any
}

/**
 * Call API with Redux integration
 * This function dispatches Redux actions for API request, success, and failure
 */
export default async function callReduxApi({
   method,
   apiPath,
   actionTypes: [requestType, successType, failureType],
   variables,
   dispatch,
   getState,
   headers,
}: CallApiProps): Promise<any> {
   if (!isFunction(dispatch) || !isFunction(getState)) {
      throw new Error('callGraphQLApi requires dispatch and getState functions')
   }
   const baseUrlApi = API_URL
   const token = TokenManager.getUserToken()

   // Check if variables is FormData to avoid setting Content-Type
   const isFormData = variables instanceof FormData

   const header: Record<string, string> = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: token ? `Bearer ${token}` : '',
   }

   dispatch(requestType())

   return axios({
      baseURL: baseUrlApi,
      headers: headers ? { ...headers, ...header } : header,
      method: method,
      url: apiPath,
      data: variables,
      params: method === 'get' ? variables : undefined,
      withCredentials: true,
   } as AxiosRequestConfig)
      .then(function (response: AxiosResponse) {
         dispatch(successType(response.data))
         return response.data
      })
      .catch((error: AxiosError) => {
         const response = error.response || error
         dispatch(failureType(error.response))
         return response
      })
}

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

export async function callApiSimple({ method, apiPath, variables, headers }: CallApiSimpleProps) {
   try {
      const response = await apiAxios.request({
         url: apiPath,
         method,
         headers,
         data: variables,
         params: method === 'get' ? variables : undefined,
      })
      return { success: true, data: response.data }
   } catch (error) {
      return { success: false, error }
   }
}
