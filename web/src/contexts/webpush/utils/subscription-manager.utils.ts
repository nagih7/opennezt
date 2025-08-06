import { fetchSubscribe, unsubscribe as unsubscribeAPI } from '../../../api/app'
import { WebPushSubscriptionPayload, WebPushApiResult } from '../../../types/webpush'
import { analyticsUtils } from './analytics.utils'

/**
 * Enhanced subscription manager with retry logic and better error handling
 */
export class WebPushSubscriptionManager {
   private maxRetries: number
   private retryDelay: number
   private enableAnalytics: boolean

   constructor(
      options: {
         maxRetries?: number
         retryDelay?: number
         enableAnalytics?: boolean
      } = {}
   ) {
      this.maxRetries = options.maxRetries ?? 3
      this.retryDelay = options.retryDelay ?? 2000
      this.enableAnalytics = options.enableAnalytics ?? false
   }

   /**
    * Subscribe to server with retry logic
    */
   async subscribeToServer(payload: WebPushSubscriptionPayload, retryCount: number = 0): Promise<WebPushApiResult> {
      try {
         const result = await fetchSubscribe(payload)

         if (result.success) {
            if (this.enableAnalytics) {
               analyticsUtils.trackWebPushEvent('server_subscription_success', {
                  endpoint: payload.endpoint,
                  retryCount,
               })
            }
            return result
         }

         // If not successful and we can retry
         if (retryCount < this.maxRetries) {
            console.warn(`🔄 Retrying server subscription (attempt ${retryCount + 1}/${this.maxRetries})`)

            await this.delay(this.retryDelay * (retryCount + 1))
            return this.subscribeToServer(payload, retryCount + 1)
         } // Max retries reached
         if (this.enableAnalytics) {
            analyticsUtils.trackWebPushEvent('server_subscription_failed_max_retries', {
               endpoint: payload.endpoint,
               error: result.success ? 'Unknown error' : result.error,
               retryCount,
            })
         }

         return result
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Unknown error'

         if (retryCount < this.maxRetries) {
            console.warn(
               `🔄 Retrying server subscription after error (attempt ${retryCount + 1}/${this.maxRetries}):`,
               errorMessage
            )

            await this.delay(this.retryDelay * (retryCount + 1))
            return this.subscribeToServer(payload, retryCount + 1)
         }

         // Max retries reached
         if (this.enableAnalytics) {
            analyticsUtils.trackWebPushEvent('server_subscription_error_max_retries', {
               endpoint: payload.endpoint,
               error: errorMessage,
               retryCount,
            })
         }

         return {
            success: false,
            error: errorMessage,
            details: error,
         }
      }
   }

   /**
    * Unsubscribe from server with retry logic
    */
   async unsubscribeFromServer(endpoint: string, retryCount: number = 0): Promise<WebPushApiResult> {
      try {
         const result = await unsubscribeAPI({ endpoint })

         if (result.success) {
            if (this.enableAnalytics) {
               analyticsUtils.trackWebPushEvent('server_unsubscription_success', {
                  endpoint,
                  retryCount,
               })
            }
            return result
         }

         // If not successful and we can retry
         if (retryCount < this.maxRetries) {
            console.warn(`🔄 Retrying server unsubscription (attempt ${retryCount + 1}/${this.maxRetries})`)

            await this.delay(this.retryDelay * (retryCount + 1))
            return this.unsubscribeFromServer(endpoint, retryCount + 1)
         }

         return result
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Unknown error'

         if (retryCount < this.maxRetries) {
            console.warn(
               `🔄 Retrying server unsubscription after error (attempt ${retryCount + 1}/${this.maxRetries}):`,
               errorMessage
            )

            await this.delay(this.retryDelay * (retryCount + 1))
            return this.unsubscribeFromServer(endpoint, retryCount + 1)
         }

         return {
            success: false,
            error: errorMessage,
            details: error,
         }
      }
   }
   /**
    * Graceful subscription with fallback handling
    */ async subscribeGracefully(payload: WebPushSubscriptionPayload): Promise<{
      localSuccess: boolean
      serverSuccess: boolean
      serverError?: string
   }> {
      // Always assume local success for this method (it should be called after local subscription succeeds)
      const localSuccess = true

      try {
         const serverResult = await this.subscribeToServer(payload)

         return {
            localSuccess,
            serverSuccess: serverResult.success,
            serverError: !serverResult.success ? serverResult.error : undefined,
         }
      } catch (error) {
         return {
            localSuccess,
            serverSuccess: false,
            serverError: error instanceof Error ? error.message : 'Unknown server error',
         }
      }
   }

   /**
    * Graceful unsubscription with fallback handling
    */ async unsubscribeGracefully(payload: { endpoint: string }): Promise<{
      localSuccess: boolean
      serverSuccess: boolean
      serverError?: string
   }> {
      // Always assume local success for this method (it should be called after local unsubscription succeeds)
      const localSuccess = true

      try {
         const serverResult = await this.unsubscribeFromServer(payload.endpoint)

         return {
            localSuccess,
            serverSuccess: serverResult.success,
            serverError: !serverResult.success ? serverResult.error : undefined,
         }
      } catch (error) {
         return {
            localSuccess,
            serverSuccess: false,
            serverError: error instanceof Error ? error.message : 'Unknown server error',
         }
      }
   } /**
    * Check server subscription status (for synchronization)
    */
   async checkServerSubscriptionStatus(_endpoint: string): Promise<{
      exists: boolean
      error?: string
   }> {
      // This would require a new API endpoint to check subscription status
      // For now, return a placeholder

      // TODO: Implement server-side endpoint to check subscription status
      return { exists: false, error: 'Not implemented yet' }
   }

   private delay(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms))
   }
}

/**
 * Factory function to create subscription manager instance
 */
export const createSubscriptionManager = (options?: {
   maxRetries?: number
   retryDelay?: number
   enableAnalytics?: boolean
}) => {
   return new WebPushSubscriptionManager(options)
}
