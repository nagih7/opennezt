import { Dispatch } from 'redux'
import { AnyAction } from 'redux-saga'

// Base API props
export interface BaseApiProps {
   method: 'get' | 'post' | 'put' | 'delete' | 'patch'
   apiPath: string
   variables?: any
   headers?: Record<string, string>
}

export interface ReduxApiProps extends BaseApiProps {
   actionTypes: [() => AnyAction, (data: any) => AnyAction, (error: any) => AnyAction]
   dispatch: Dispatch
   getState: () => any
}

// Base API response
export interface BaseApiResponse<T = any> {
   status: number
   success: boolean
   message?: string
   data?: T
   error?: any
}
