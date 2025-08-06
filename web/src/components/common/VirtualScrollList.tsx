import React, { useState, useCallback, useMemo, useRef } from 'react'
import { useOptimizedEventListener } from '~/hooks/useOptimizedPerformance'

interface VirtualScrollListProps<T> {
   items: T[]
   itemHeight: number | ((index: number, item: T) => number)
   renderItem: (item: T, index: number) => React.ReactNode
   containerHeight: number
   overscan?: number
   className?: string
   onScroll?: (scrollTop: number) => void
   loadMore?: () => void
   hasMore?: boolean
   loading?: boolean
   loadingComponent?: React.ReactNode
   emptyComponent?: React.ReactNode
}

/**
 * Virtual scrolling component for rendering large lists efficiently
 */
const VirtualScrollList = <T,>({
   items,
   itemHeight,
   renderItem,
   containerHeight,
   overscan = 5,
   className = '',
   onScroll,
   loadMore,
   hasMore = false,
   loading = false,
   loadingComponent,
   emptyComponent,
}: VirtualScrollListProps<T>) => {
   const [scrollTop, setScrollTop] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)
   const isScrolling = useRef(false)
   const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

   // Calculate item heights
   const itemHeights = useMemo(() => {
      if (typeof itemHeight === 'number') {
         return items.map(() => itemHeight)
      }
      return items.map((item, index) => itemHeight(index, item))
   }, [items, itemHeight])

   // Calculate total height and item positions
   const { totalHeight, itemPositions } = useMemo(() => {
      let totalHeight = 0
      const positions: number[] = []

      itemHeights.forEach((height) => {
         positions.push(totalHeight)
         totalHeight += height
      })

      return { totalHeight, itemPositions: positions }
   }, [itemHeights])

   // Calculate visible range
   const visibleRange = useMemo(() => {
      if (items.length === 0) {
         return { start: 0, end: 0 }
      }

      let start = 0
      let end = items.length - 1

      // Find start index
      for (let i = 0; i < itemPositions.length; i++) {
         if (itemPositions[i] + itemHeights[i] > scrollTop) {
            start = Math.max(0, i - overscan)
            break
         }
      }

      // Find end index
      for (let i = start; i < itemPositions.length; i++) {
         if (itemPositions[i] > scrollTop + containerHeight) {
            end = Math.min(items.length - 1, i + overscan)
            break
         }
      }

      return { start, end }
   }, [scrollTop, containerHeight, itemPositions, itemHeights, items.length, overscan])

   // Handle scroll
   const handleScroll = useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
         const newScrollTop = event.currentTarget.scrollTop
         setScrollTop(newScrollTop)
         onScroll?.(newScrollTop)

         isScrolling.current = true

         // Clear existing timeout
         if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
         }

         // Set timeout to detect scroll end
         scrollTimeout.current = setTimeout(() => {
            isScrolling.current = false
         }, 150)

         // Load more items when near bottom
         if (loadMore && hasMore && !loading) {
            const scrollBottom = newScrollTop + containerHeight
            const threshold = totalHeight - containerHeight * 0.5

            if (scrollBottom >= threshold) {
               loadMore()
            }
         }
      },
      [onScroll, loadMore, hasMore, loading, totalHeight, containerHeight]
   )

   // Render visible items
   const visibleItems = useMemo(() => {
      const items_to_render = []

      for (let i = visibleRange.start; i <= visibleRange.end; i++) {
         if (i >= items.length) break

         const item = items[i]
         const top = itemPositions[i]
         const height = itemHeights[i]

         items_to_render.push(
            <div
               key={i}
               style={{
                  position: 'absolute',
                  top,
                  left: 0,
                  right: 0,
                  height,
               }}
            >
               {renderItem(item, i)}
            </div>
         )
      }

      return items_to_render
   }, [visibleRange, items, itemPositions, itemHeights, renderItem])

   // Scroll to specific index
   const scrollToIndex = useCallback(
      (index: number) => {
         if (containerRef.current && index >= 0 && index < items.length) {
            const targetScrollTop = itemPositions[index]
            containerRef.current.scrollTop = targetScrollTop
            setScrollTop(targetScrollTop)
         }
      },
      [itemPositions, items.length]
   )

   // Create a separate ref for imperative methods
   const imperativeRef = useRef<{
      scrollToIndex: (index: number) => void
      scrollToTop: () => void
      scrollToBottom: () => void
   }>(null)

   // Expose scroll methods
   React.useImperativeHandle(
      imperativeRef,
      () => ({
         scrollToIndex,
         scrollToTop: () => scrollToIndex(0),
         scrollToBottom: () => scrollToIndex(items.length - 1),
      }),
      [scrollToIndex, items.length]
   )

   // Handle empty state
   if (items.length === 0 && !loading) {
      return (
         <div className={`flex items-center justify-center ${className}`} style={{ height: containerHeight }}>
            {emptyComponent || <div className="text-gray-500">No items to display</div>}
         </div>
      )
   }

   return (
      <div
         ref={containerRef}
         className={`overflow-auto ${className}`}
         style={{ height: containerHeight }}
         onScroll={handleScroll}
      >
         <div style={{ height: totalHeight, position: 'relative' }}>
            {visibleItems}
            {loading && (
               <div
                  style={{
                     position: 'absolute',
                     top: totalHeight,
                     left: 0,
                     right: 0,
                     height: 50,
                  }}
                  className="flex items-center justify-center"
               >
                  {loadingComponent || <div className="text-gray-500">Loading...</div>}
               </div>
            )}
         </div>
      </div>
   )
}

export default React.memo(VirtualScrollList) as <T>(props: VirtualScrollListProps<T>) => React.ReactElement

/**
 * Hook for virtual scrolling with infinite loading
 */
export function useVirtualScroll<T>({
   items,
   fetchMore,
   hasMore,
   loading,
}: {
   items: T[]
   fetchMore: () => Promise<void>
   hasMore: boolean
   loading: boolean
}) {
   const [isLoadingMore, setIsLoadingMore] = useState(false)

   const loadMore = useCallback(async () => {
      if (isLoadingMore || !hasMore) return

      setIsLoadingMore(true)
      try {
         await fetchMore()
      } finally {
         setIsLoadingMore(false)
      }
   }, [fetchMore, hasMore, isLoadingMore])

   return {
      items,
      loadMore,
      hasMore,
      loading: loading || isLoadingMore,
   }
}

/**
 * Grid virtual scrolling component
 */
export function VirtualScrollGrid<T>({
   items,
   itemWidth,
   itemHeight,
   containerWidth,
   containerHeight,
   renderItem,
   gap = 0,
   className = '',
}: {
   items: T[]
   itemWidth: number
   itemHeight: number
   containerWidth: number
   containerHeight: number
   renderItem: (item: T, index: number) => React.ReactNode
   gap?: number
   className?: string
}) {
   const [scrollTop, setScrollTop] = useState(0)

   // Calculate grid dimensions
   const columnsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap))
   const totalRows = Math.ceil(items.length / columnsPerRow)
   const totalHeight = totalRows * (itemHeight + gap) - gap

   // Calculate visible range
   const visibleRange = useMemo(() => {
      const startRow = Math.floor(scrollTop / (itemHeight + gap))
      const endRow = Math.min(totalRows - 1, Math.ceil((scrollTop + containerHeight) / (itemHeight + gap)))

      return {
         start: startRow * columnsPerRow,
         end: Math.min(items.length - 1, (endRow + 1) * columnsPerRow - 1),
      }
   }, [scrollTop, containerHeight, itemHeight, gap, totalRows, columnsPerRow, items.length])

   // Render visible items
   const visibleItems = useMemo(() => {
      const rendered = []

      for (let i = visibleRange.start; i <= visibleRange.end; i++) {
         if (i >= items.length) break

         const row = Math.floor(i / columnsPerRow)
         const col = i % columnsPerRow
         const top = row * (itemHeight + gap)
         const left = col * (itemWidth + gap)

         rendered.push(
            <div
               key={i}
               style={{
                  position: 'absolute',
                  top,
                  left,
                  width: itemWidth,
                  height: itemHeight,
               }}
            >
               {renderItem(items[i], i)}
            </div>
         )
      }

      return rendered
   }, [visibleRange, items, columnsPerRow, itemHeight, itemWidth, gap, renderItem])

   return (
      <div
         className={`overflow-auto ${className}`}
         style={{ height: containerHeight, width: containerWidth }}
         onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
         <div style={{ height: totalHeight, position: 'relative', width: '100%' }}>{visibleItems}</div>
      </div>
   )
}
