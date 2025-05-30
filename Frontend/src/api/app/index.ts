import callApi from '../callApi'
import {
   WebPushSubscriptionPayload,
   WebPushSubscriptionResponse,
   WebPushApiResult,
   isWebPushSubscriptionResponse,
   isWebPushApiError,
} from '../../types/webpush'

// ========== WEB PUSH ========== //
export const fetchSubscribe = async (
   payload: WebPushSubscriptionPayload
): Promise<WebPushApiResult<WebPushSubscriptionResponse>> => {
   try {
      const response = await callApi({
         method: 'post',
         apiPath: '/subscribe',
         variables: payload,
      })

      // Validate response structure
      if (!isWebPushSubscriptionResponse(response)) {
         return {
            success: false,
            error: 'Invalid server response format',
            details: response,
         }
      }

      // Handle API errors
      if (isWebPushApiError(response)) {
         return {
            success: false,
            error: response.message || 'Subscription failed',
            details: response.error,
         }
      }

      // Success case
      if (response.status === 200 && response.success) {
         return {
            success: true,
            data: response,
         }
      }

      // Unexpected status
      return {
         success: false,
         error: `Unexpected response status: ${response.status}`,
         details: response,
      }
   } catch (error) {
      return {
         success: false,
         error: error instanceof Error ? error.message : 'Network error occurred',
         details: error,
      }
   }
}

export const unsubscribe = async (payload: {
   endpoint: string
}): Promise<WebPushApiResult<WebPushSubscriptionResponse>> => {
   try {
      const response = await callApi({
         method: 'post',
         apiPath: '/subscribe/unsubscribe',
         variables: payload,
      })

      if (!isWebPushSubscriptionResponse(response)) {
         return {
            success: false,
            error: 'Invalid server response format',
            details: response,
         }
      }

      if (isWebPushApiError(response)) {
         return {
            success: false,
            error: response.message || 'Unsubscription failed',
            details: response.error,
         }
      }

      if (response.status === 200 && response.success) {
         return {
            success: true,
            data: response,
         }
      }

      return {
         success: false,
         error: `Unexpected response status: ${response.status}`,
         details: response,
      }
   } catch (error) {
      return {
         success: false,
         error: error instanceof Error ? error.message : 'Network error occurred',
         details: error,
      }
   }
}
