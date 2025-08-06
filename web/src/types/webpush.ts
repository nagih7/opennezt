// Enhanced WebPush specific types
export interface WebPushSubscriptionPayload {
   endpoint: string
   expirationTime: number | null
   keys: {
      p256dh: string
      auth: string
   }
}

export interface WebPushSubscriptionResponse {
   status: number
   success: boolean
   message?: string
   data?: {
      id?: string
      endpoint?: string
      created_at?: string
      updated_at?: string
   }
   error?: any
}

export interface WebPushApiError {
   status: number
   success: false
   message: string
   error?: any
}

// Type guards for response validation
export const isWebPushSubscriptionResponse = (response: any): response is WebPushSubscriptionResponse => {
   return (
      typeof response === 'object' &&
      response !== null &&
      typeof response.status === 'number' &&
      typeof response.success === 'boolean'
   )
}

export const isWebPushApiError = (response: any): response is WebPushApiError => {
   return isWebPushSubscriptionResponse(response) && response.success === false && typeof response.message === 'string'
}

// API call result type for better error handling
export type WebPushApiResult<T = any> = { success: true; data: T } | { success: false; error: string; details?: any }
