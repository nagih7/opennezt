import axios from 'axios'
import { isFunction } from 'lodash'
import { getAuthToken } from '../utils/localStorage'

export default async function callApi({
   method,
   apiPath,
   actionTypes: [requestType, successType, failureType],
   variables,
   dispatch,
   getState,
   headers,
}) {
   if (!isFunction(dispatch) || !isFunction(getState)) {
      throw new Error('callGraphQLApi requires dispatch and getState functions')
   }

   const baseUrlApi = import.meta.env.VITE_API_URL
   const token = getAuthToken()
   const header = {
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
      params: method === 'get' ? variables : '',
      withCredentials: true,
   })
      .then(function (response) {
         dispatch(successType(response.data))
      })
      .catch((error) => {
         let response = error.response ? error.response : error
         dispatch(failureType(error.response))
         return response
      })
}

// =============== CALL API DON'T USE STATE ========== //
export async function callApiSimple({ method, apiPath, variables, headers }) {
   const baseUrlApi = import.meta.env.VITE_API_URL
   const token = getAuthToken()
   const header = {
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
         params: method === 'get' ? variables : '',
         withCredentials: true,
      })

      return {
         success: true,
         data: response.data,
      }
   } catch (error) {
      return {
         success: false,
         error: error.response || error,
      }
   }
}
