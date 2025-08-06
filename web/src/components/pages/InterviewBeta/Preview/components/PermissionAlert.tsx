import React from 'react'

interface PermissionAlertProps {
   error?: string | null
   permissionStatus: {
      camera: 'granted' | 'denied' | 'prompt'
      microphone: 'granted' | 'denied' | 'prompt'
   }
   requestMediaPermissions: () => void
}

const PermissionAlert: React.FC<PermissionAlertProps> = ({ error, permissionStatus, requestMediaPermissions }) => {
   if (error) {
      return (
         <div className="w-full px-4 py-3 mb-4 text-red-700 border border-red-300 rounded-md bg-red-50">
            <div className="font-semibold">Error detecting devices</div>
            <div className="text-sm">{error}</div>
            <button
               className="px-3 py-1 mt-2 text-sm bg-red-100 rounded-md hover:bg-red-200"
               onClick={requestMediaPermissions}
            >
               Grant Permissions
            </button>
         </div>
      )
   }

   if (permissionStatus.camera === 'denied' || permissionStatus.microphone === 'denied') {
      return (
         <div className="w-full px-4 py-3 mb-4 text-yellow-700 border border-yellow-300 rounded-md bg-yellow-50">
            <div className="font-semibold">Permission Required</div>
            <div className="text-sm">
               Please allow access to your {permissionStatus.camera === 'denied' ? 'camera' : ''}
               {permissionStatus.camera === 'denied' && permissionStatus.microphone === 'denied' ? ' and ' : ''}
               {permissionStatus.microphone === 'denied' ? 'microphone' : ''} to join the interview.
            </div>
            <button
               className="px-3 py-1 mt-2 text-sm bg-yellow-100 rounded-md hover:bg-yellow-200"
               onClick={requestMediaPermissions}
            >
               Grant Permissions
            </button>
         </div>
      )
   }

   return null
}

export default PermissionAlert
