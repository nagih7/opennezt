import urlBase64ToUint8Array from './urlBase64ToUint8Array.js'

// Interface cho kết quả validation VAPID key
export interface VapidValidationResult {
   valid: boolean
   error?: string
   details?: {
      originalKey: string
      keyLength: number
      hasValidBase64: boolean
      uint8ArrayLength: number
      convertedSuccessfully: boolean
   }
}

// Interface cho kết quả debug subscription
export interface DebugSubscriptionResult {
   success: boolean
   subscription?: PushSubscription
   error?: Error
   timeoutReached?: boolean
   diagnostics?: {
      permissionGranted: boolean
      serviceWorkerReady: boolean
      pushManagerAvailable: boolean
      vapidKeyValid: boolean
   }
}

/**
 * Validate VAPID key với logging chi tiết
 */
export const validateVapidKey = (vapidKey: string): VapidValidationResult => {
   console.log('🔍 VAPID Key Validation Details:')
   console.log('  Original key:', vapidKey)
   console.log('  Key length:', vapidKey.length)

   const result: VapidValidationResult = {
      valid: false,
      details: {
         originalKey: vapidKey,
         keyLength: vapidKey.length,
         hasValidBase64: false,
         uint8ArrayLength: 0,
         convertedSuccessfully: false,
      },
   }

   // Check if key exists
   if (!vapidKey || typeof vapidKey !== 'string') {
      result.error = 'VAPID key is missing or not a string'
      console.log('  ❌ Error:', result.error)
      return result
   }

   // Check key length (should be 88 characters for base64url encoded 65-byte key)
   if (vapidKey.length !== 88) {
      result.error = `VAPID key length should be 88 characters, got ${vapidKey.length}`
      console.log('  ❌ Error:', result.error)
      return result
   }

   // Check if it's valid base64url
   const base64UrlPattern = /^[A-Za-z0-9_-]+$/
   if (!base64UrlPattern.test(vapidKey)) {
      result.error = 'VAPID key contains invalid base64url characters'
      result.details!.hasValidBase64 = false
      console.log('  ❌ Error:', result.error)
      return result
   }

   result.details!.hasValidBase64 = true
   console.log('  ✅ Base64url format is valid')

   // Try to convert to Uint8Array
   try {
      const uint8Array = urlBase64ToUint8Array(vapidKey)
      result.details!.uint8ArrayLength = uint8Array.length
      result.details!.convertedSuccessfully = true

      console.log('  ✅ Conversion to Uint8Array successful')
      console.log('  📏 Uint8Array length:', uint8Array.length)

      // VAPID key should be 65 bytes when converted
      if (uint8Array.length !== 65) {
         result.error = `VAPID key should be 65 bytes when decoded, got ${uint8Array.length} bytes`
         console.log('  ❌ Error:', result.error)
         return result
      }

      result.valid = true
      console.log('  ✅ VAPID key validation passed!')
   } catch (error) {
      result.error = `Failed to convert VAPID key: ${error instanceof Error ? error.message : 'Unknown error'}`
      result.details!.convertedSuccessfully = false
      console.log('  ❌ Conversion error:', result.error)
      return result
   }

   return result
}

/**
 * Debug subscription process với timeout
 */
export const debugSubscribeProcess = async (
   registration: ServiceWorkerRegistration,
   vapidKey: string
): Promise<DebugSubscriptionResult> => {
   console.log('🔍 Starting debug subscription process...')

   const result: DebugSubscriptionResult = {
      success: false,
      diagnostics: {
         permissionGranted: false,
         serviceWorkerReady: false,
         pushManagerAvailable: false,
         vapidKeyValid: false,
      },
   }

   try {
      // Check permission
      result.diagnostics!.permissionGranted = Notification.permission === 'granted'
      console.log('  📋 Permission granted:', result.diagnostics!.permissionGranted)

      // Check service worker
      result.diagnostics!.serviceWorkerReady = registration.active !== null
      console.log('  🔧 Service worker ready:', result.diagnostics!.serviceWorkerReady)

      // Check push manager
      result.diagnostics!.pushManagerAvailable = 'pushManager' in registration
      console.log('  📡 Push manager available:', result.diagnostics!.pushManagerAvailable)

      // Validate VAPID key
      const vapidValidation = validateVapidKey(vapidKey)
      result.diagnostics!.vapidKeyValid = vapidValidation.valid
      console.log('  🔑 VAPID key valid:', result.diagnostics!.vapidKeyValid)

      if (!vapidValidation.valid) {
         result.error = new Error(`VAPID validation failed: ${vapidValidation.error}`)
         return result
      }

      // Convert VAPID key
      const applicationServerKey = urlBase64ToUint8Array(vapidKey)
      console.log('  🔄 VAPID key converted to Uint8Array, length:', applicationServerKey.length)

      // Create subscription with timeout
      console.log('  🚀 Attempting subscription...')

      const subscriptionPromise = registration.pushManager.subscribe({
         userVisibleOnly: true,
         applicationServerKey,
      })

      // Add timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
         setTimeout(() => {
            reject(new Error('Subscription timeout after 10 seconds'))
         }, 10000)
      })

      const subscription = await Promise.race([subscriptionPromise, timeoutPromise])

      result.success = true
      result.subscription = subscription
      console.log('  ✅ Subscription successful!')
   } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.log('  ❌ Subscription failed:', errorMessage)

      if (errorMessage.includes('timeout')) {
         result.timeoutReached = true
      }

      result.error = error instanceof Error ? error : new Error(errorMessage)
   }

   return result
}

/**
 * Log chi tiết VAPID key configuration
 */
export const logVapidKeyDetails = (frontendKey?: string, backendKey?: string) => {
   console.log('🔑 VAPID Key Configuration Analysis:')

   if (frontendKey) {
      console.log('  Frontend VAPID Key:')
      console.log('    Key:', frontendKey)
      console.log('    Length:', frontendKey.length)
      console.log('    First 20 chars:', frontendKey.substring(0, 20) + '...')
      console.log('    Last 20 chars:', '...' + frontendKey.substring(frontendKey.length - 20))
   } else {
      console.log('  ❌ Frontend VAPID Key: MISSING')
   }

   if (backendKey) {
      console.log('  Backend VAPID Key:')
      console.log('    Key:', backendKey)
      console.log('    Length:', backendKey.length)
      console.log('    First 20 chars:', backendKey.substring(0, 20) + '...')
      console.log('    Last 20 chars:', '...' + backendKey.substring(backendKey.length - 20))

      if (frontendKey) {
         console.log('  🔄 Keys Match:', frontendKey === backendKey ? '✅ YES' : '❌ NO')
      }
   } else {
      console.log('  ❌ Backend VAPID Key: MISSING')
   }
}
