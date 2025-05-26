import { useEffect, useRef } from 'react'
import { useAppSelector } from '~/store'

// Type definitions
interface UseUserFrameReturn {
   localVideoRef: React.RefObject<HTMLVideoElement | null>
   hasJoined: boolean
}

export const useUserFrame = (videoRef: React.RefObject<HTMLVideoElement>): UseUserFrameReturn => {
   const { hasJoined } = useAppSelector((state) => state.interview)
   const localVideoRef = useRef<HTMLVideoElement>(null)

   // Apply stream from main videoRef to this video element
   useEffect(() => {
      if (videoRef?.current?.srcObject && localVideoRef.current) {
         // Set the srcObject property on the video element ref
         localVideoRef.current.srcObject = videoRef.current.srcObject
      }
   }, [videoRef, hasJoined])

   return {
      localVideoRef,
      hasJoined,
   }
}
