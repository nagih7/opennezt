import { useRef, useCallback, useEffect } from 'react'

interface UseInfiniteScrollProps {
   hasMore: boolean
   isLoading: boolean
   onLoadMore: () => void
   threshold?: number
}

/**
 * Custom hook for infinite scrolling functionality
 */
export const useInfiniteScroll = ({ 
   hasMore, 
   isLoading, 
   onLoadMore, 
   threshold = 0.1 
}: UseInfiniteScrollProps) => {
   const observerRef = useRef<IntersectionObserver | null>(null)
   const isLoadingRef = useRef(isLoading)
   
   // Update loading ref when loading state changes
   useEffect(() => {
      isLoadingRef.current = isLoading
   }, [isLoading])

   const lastElementRef = useCallback(
      (node: HTMLDivElement | null) => {
         // Disconnect previous observer
         if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
         }

         // Create new observer if node exists and has more data
         if (node && hasMore) {
            observerRef.current = new IntersectionObserver(
               (entries) => {
                  const first = entries[0]
                  if (first.isIntersecting && hasMore && !isLoadingRef.current) {
                     onLoadMore()
                  }
               },
               { threshold }
            )

            observerRef.current.observe(node)
         }
      },
      [hasMore, onLoadMore, threshold]
   )

   // Cleanup observer on unmount
   useEffect(() => {
      return () => {
         if (observerRef.current) {
            observerRef.current.disconnect()
         }
      }
   }, [])

   return { lastElementRef }
}
