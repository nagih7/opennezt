import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { isFunction } from 'lodash'
import { getAuthToken } from '../utils/localStorage'
import { AnyAction, Dispatch } from 'redux'

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
export default async function callApi({
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

   const baseUrlApi = import.meta.env.VITE_API_URL
   const token = getAuthToken()
   const header: Record<string, string> = {
      'Content-Type': 'application/json',
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

/**
 * Simple API call without Redux integration
 * Returns a standardized response object with success/error information
 */
export async function callApiSimple({ method, apiPath, variables, headers }: CallApiSimpleProps): Promise<ApiResponse> {
   const baseUrlApi = import.meta.env.VITE_API_URL
   const token = getAuthToken()
   const header: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
   }

   try {
      const response = await axios({
         baseURL: baseUrlApi,
         headers: headers ? { ...headers, ...header } : header,
         method: method,
         url: apiPath,
         data: variables,
         params: method === 'get' ? variables : undefined,
         withCredentials: true,
      } as AxiosRequestConfig)

      return {
         success: true,
         data: response.data,
      }
   } catch (error) {
      const axiosError = error as AxiosError
      return {
         success: false,
         error: axiosError.response || axiosError,
      }
   }
}
