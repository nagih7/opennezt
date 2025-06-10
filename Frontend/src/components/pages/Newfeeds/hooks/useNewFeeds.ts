import { useState, useEffect, useMemo, useRef } from 'react'
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
   
   // Add refs to track API call status
   const initialLoadMadeRef = useRef(false)
   const isInitialLoadingRef = useRef(false)
   const prevFeedsLengthRef = useRef(feeds.length)
   
   // Handle initial load AND reload after feeds is cleared
   useEffect(() => {
      // Case 1: Initial load (never loaded before)
      const isInitialLoad = !initialLoadMadeRef.current && !isInitialLoadingRef.current && feeds.length === 0;
      
      // Case 2: Feeds was cleared after having content (e.g. after creating new article)
      const wasCleared = prevFeedsLengthRef.current > 0 && feeds.length === 0;
      
      // Update previous length reference for next check
      prevFeedsLengthRef.current = feeds.length;
      
      if ((isInitialLoad || wasCleared) && hasMore && !isInitialLoadingRef.current) {
         // Set loading state to prevent duplicate calls
         isInitialLoadingRef.current = true;
         
         dispatch(
            getListFeeds({
               cursor: new Date(),
               limit: limit,
            } as any)
         ).then(() => {
            // Mark initial load as complete after API call finishes
            initialLoadMadeRef.current = true;
            isInitialLoadingRef.current = false;
         });
      }
   }, [dispatch, feeds.length, limit, hasMore]);

   // Handle pagination - only runs when cursor changes from its default value
   useEffect(() => {
      if (dataFilter.cursor !== 0) {
         dispatch(getListFeeds(dataFilter));
      }
   }, [dispatch, dataFilter]);

   const loadMore = useMemo(() => ({
      setDataFilter,
      nextCursor,
      limit,
      hasMore,
      isLoading: isLoadingGetFeeds,
   }), [setDataFilter, nextCursor, limit, hasMore, isLoadingGetFeeds]);

   return {
      feeds,
      onetimefeeds,
      isLoadingGetFeeds,
      pagination,
      loadMore,
   };
};
