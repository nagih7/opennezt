import { BaseSocketProps, BaseSocketResponse } from '~/types/api'

const DEFAULT_TIMEOUT = 10000 // 10 seconds

/**
 * Calls a socket API endpoint with proper error handling and typing
 * @param params - Socket call parameters including event, payload, and optional timeout
 * @returns Promise with typed response data
 */
const callSocket = async <T = any>({
   event,
   payload,
   timeout = DEFAULT_TIMEOUT,
   socket,
}: BaseSocketProps): Promise<BaseSocketResponse<T>> => {
   try {
      // Validate socket connection
      if (!socket) {
         const error = { message: 'Socket instance not provided' }
         return { success: false, error }
      }

      if (!socket.connected) {
         const error = { message: 'Socket connection not available' }
         return { success: false, error }
      } // Validate event parameter
      if (!event || typeof event !== 'string') {
         const error = { message: 'Event name is required and must be a string' }
         return { success: false, error }
      }

      // Create promise to handle socket response
      return new Promise<BaseSocketResponse<T>>((resolve) => {
         // Set timeout to handle case where server doesn't respond
         const timeoutId = setTimeout(() => {
            const error = {
               message: `Socket request timed out after ${timeout}ms`,
               timeout: true,
            }
            resolve({ success: false, error })
         }, timeout)

         try {
            // Emit event to server with payload and handle response
            socket.emit(event, payload, (response: any) => {
               clearTimeout(timeoutId)

               try {
                  // Handle different response formats
                  if (response === null || response === undefined) {
                     resolve({
                        success: false,
                        error: { message: 'No response received from server' },
                     })
                     return
                  }

                  // If response has error property
                  if (response.error) {
                     resolve({
                        success: false,
                        error: response.error,
                        message: response.message || 'Socket request failed',
                     })
                     return
                  }

                  // If response has success property
                  if (typeof response.success === 'boolean') {
                     resolve({
                        success: response.success,
                        data: response.data,
                        message: response.message,
                        error: response.success ? undefined : response.error,
                     })
                     return
                  }

                  // Default success case - assume response is the data
                  resolve({
                     success: true,
                     data: response,
                     message: 'Socket request completed successfully',
                  })
               } catch (parseError) {
                  resolve({
                     success: false,
                     error: {
                        message: 'Failed to parse socket response',
                        details: parseError,
                     },
                  })
               }
            })
         } catch (emitError) {
            clearTimeout(timeoutId)
            resolve({
               success: false,
               error: {
                  message: 'Failed to emit socket event',
                  details: emitError,
               },
            })
         }
      })
   } catch (error) {
      // Handle any synchronous errors
      return {
         success: false,
         error: {
            message: 'Unexpected error in socket call',
            details: error,
         },
      }
   }
}

export default callSocket
