import { useState, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { getListFeeds } from '~/api/newfeeds'
import { DataFilter } from '~/types'

/**
 * Custom hook for managing NewFeeds data fetching and state
 */
export const useNewFeeds = () => {
   const dispatch = useAppDispatch()
   
   const {
      feeds,
      onetimefeeds,
      isLoadingGetFeeds,
      pagination,
   } = useAppSelector((state) => state.article)
   
   const { nextCursor, limit, hasMore } = pagination
   
   const [dataFilter, setDataFilter] = useState<DataFilter>({
      cursor: 0,
      limit: limit,
   })

   // Initial load
   useEffect(() => {
      if (feeds.length === 0 && hasMore === true) {
         dispatch(
            getListFeeds({
               cursor: new Date(),
               limit: limit,
            } as any)
         )
      }
   }, [dispatch, feeds.length, limit, hasMore])

   // Load more when cursor changes
   useEffect(() => {
      if (dataFilter.cursor !== 0) {
         dispatch(getListFeeds(dataFilter))
      }
   }, [dispatch, dataFilter])

   const loadMore = useMemo(() => ({
      setDataFilter,
      nextCursor,
      limit,
      hasMore,
      isLoading: isLoadingGetFeeds,
   }), [setDataFilter, nextCursor, limit, hasMore, isLoadingGetFeeds])

   return {
      feeds,
      onetimefeeds,
      isLoadingGetFeeds,
      pagination,
      loadMore,
   }
}
