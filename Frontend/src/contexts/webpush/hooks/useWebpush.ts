import { useContext } from 'react'
import { WebPushContext } from '../WebpushContext'
import { WebPushContextType } from '../webpush.types'

export const useWebPush = (): WebPushContextType => {
   const context = useContext(WebPushContext)

   if (context === undefined) {
      throw new Error('useWebPush must be used within a WebPushProvider')
   }

   return context
}
