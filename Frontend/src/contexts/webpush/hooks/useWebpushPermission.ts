import { useState, useEffect, useCallback } from 'react'
import { NotificationPermissionStatus } from '../webpush.types'

export const useWebPushPermission = () => {
   const [permission, setPermission] = useState<NotificationPermissionStatus>(
      typeof window !== 'undefined' && 'Notification' in window
         ? (Notification.permission as NotificationPermissionStatus)
         : NotificationPermissionStatus.DEFAULT
   )

   const requestPermission = useCallback(async (): Promise<NotificationPermissionStatus> => {
      if (!('Notification' in window)) {
         return NotificationPermissionStatus.DENIED
      }

      const result = (await Notification.requestPermission()) as NotificationPermissionStatus
      setPermission(result)
      return result
   }, [])

   useEffect(() => {
      if (typeof window === 'undefined' || !('Notification' in window)) {
         return
      }

      const handlePermissionChange = () => {
         setPermission(Notification.permission as NotificationPermissionStatus)
      }

      // Listen for permission changes (if supported)
      if ('permissions' in navigator) {
         navigator.permissions
            .query({ name: 'notifications' as PermissionName })
            .then((permissionStatus) => {
               permissionStatus.addEventListener('change', handlePermissionChange)
               return () => permissionStatus.removeEventListener('change', handlePermissionChange)
            })
            .catch(() => {
               // Fallback: check permission periodically
               const interval = setInterval(handlePermissionChange, 1000)
               return () => clearInterval(interval)
            })
      }
   }, [])

   return {
      permission,
      requestPermission,
      isGranted: permission === NotificationPermissionStatus.GRANTED,
      isDenied: permission === NotificationPermissionStatus.DENIED,
      isDefault: permission === NotificationPermissionStatus.DEFAULT,
   }
}
