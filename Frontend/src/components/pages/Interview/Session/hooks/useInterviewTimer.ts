import { useState, useEffect, useRef, useCallback } from 'react'

interface UseInterviewTimerProps {
   isActive: boolean
   autoStart?: boolean
}

interface UseInterviewTimerReturn {
   duration: number
   formattedTime: string
   startTimer: () => void
   stopTimer: () => void
   resetTimer: () => void
   isRunning: boolean
}

export const useInterviewTimer = ({ isActive, autoStart = true }: UseInterviewTimerProps): UseInterviewTimerReturn => {
   const [duration, setDuration] = useState<number>(0)
   const [isRunning, setIsRunning] = useState<boolean>(false)
   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

   const startTimer = useCallback((): void => {
      if (timerRef.current) return // Already running

      setIsRunning(true)
      timerRef.current = setInterval(() => {
         setDuration((prev) => prev + 1)
      }, 1000)
   }, [])

   const stopTimer = useCallback((): void => {
      if (timerRef.current) {
         clearInterval(timerRef.current)
         timerRef.current = null
      }
      setIsRunning(false)
   }, [])

   const resetTimer = useCallback((): void => {
      stopTimer()
      setDuration(0)
   }, [stopTimer])

   // Format time for display (mm:ss)
   const formatTime = useCallback((seconds: number): string => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`
   }, [])

   const formattedTime = formatTime(duration)

   // Auto start/stop timer based on isActive prop
   useEffect(() => {
      if (isActive && autoStart && !isRunning) {
         startTimer()
      } else if (!isActive && isRunning) {
         stopTimer()
      }
   }, [isActive, autoStart, isRunning, startTimer, stopTimer])

   // Cleanup on unmount
   useEffect(() => {
      return () => {
         stopTimer()
      }
   }, [stopTimer])

   return {
      duration,
      formattedTime,
      startTimer,
      stopTimer,
      resetTimer,
      isRunning,
   }
}
