import { Dispatch } from 'redux'
import { Socket } from 'socket.io-client'

// Base API props
export interface BaseApiProps {
   method: 'get' | 'post' | 'put' | 'delete' | 'patch'
   apiPath: string
   variables?: any
   headers?: Record<string, string>
}

// Base Socket props
export interface BaseSocketProps {
   event: string
   payload?: any
   timeout?: number
   socket: Socket
}

export interface ReduxApiProps extends BaseApiProps {
   actionTypes: [() => any, (data: any) => any, (error: any) => any]
   dispatch: Dispatch
   getState: () => any
}

// Base Socket response
export interface BaseSocketResponse<T = any> {
   success: boolean
   data?: T
   error?: any
   message?: string
}

// Base API response
export interface BaseApiResponse<T = any> {
   status: number
   success: boolean
   message?: string
   data?: T
   error?: any
}
