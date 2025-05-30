/**
 * Simple VAPID Key Validation Test
 * Chạy trực tiếp trong browser console để debug
 */

console.log('🔍 Simple VAPID Key Test')

// VAPID key từ config
const PUBLIC_VALID_KEY = 'BE8SAJ4paNSlWGwd42g2gBpSDmyCObRUfk0ev_WQioYN-aMZjHZju7TTjspxp110kE7PPI-Ex8n55rKPtc_QO4CI'

console.log('📋 VAPID Key Info:')
console.log('  Key:', PUBLIC_VALID_KEY)
console.log('  Length:', PUBLIC_VALID_KEY.length)
console.log('  Expected length: 87 (Base64URL without padding)')
console.log('  Length OK:', PUBLIC_VALID_KEY.length === 87 ? '✅' : '❌')

// Test base64url pattern
const base64UrlPattern = /^[A-Za-z0-9_-]+$/
const isValidBase64Url = base64UrlPattern.test(PUBLIC_VALID_KEY)
console.log('  Base64url pattern:', isValidBase64Url ? '✅' : '❌')

// Test conversion to Uint8Array (copy function from urlBase64ToUint8Array.js)
function testUrlBase64ToUint8Array(base64String) {
   try {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

      console.log('  After padding:', base64)

      const rawData = window.atob(base64)
      console.log('  Raw data length:', rawData.length)

      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
         outputArray[i] = rawData.charCodeAt(i)
      }

      console.log('  Uint8Array length:', outputArray.length)
      console.log('  Expected: 65 bytes')
      console.log('  Conversion OK:', outputArray.length === 65 ? '✅' : '❌')

      return outputArray
   } catch (error) {
      console.log('  ❌ Conversion failed:', error.message)
      return null
   }
}

console.log('🔄 Testing conversion...')
const result = testUrlBase64ToUint8Array(PUBLIC_VALID_KEY)

if (result) {
   console.log('✅ VAPID key validation PASSED')
} else {
   console.log('❌ VAPID key validation FAILED')
}

// Export for manual testing
window.testVapidKey = testUrlBase64ToUint8Array
window.PUBLIC_VALID_KEY = PUBLIC_VALID_KEY
