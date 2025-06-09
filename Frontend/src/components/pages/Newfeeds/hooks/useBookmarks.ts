import { useEffect, useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { handleGetUserBookmarks, handleBookmarkArticle } from '~/api/newfeeds'
import { updateBookmarks } from '~/store/modules/article'
import { postActivitySaveArticle, deleteActivitySaveArticle } from '~/api/activity'

interface BookmarkData {
   article_id: string
   marked: string
}

interface BookmarkItem {
   target_id: string
   marked: string
}

/**
 * Custom hook for managing article bookmarks
 */
export const useBookmarks = (onetimefeeds: any[]) => {
   const dispatch = useAppDispatch()
   
   const { bookmarks } = useAppSelector((state) => state.article)

   // Load user bookmarks when feeds change
   useEffect(() => {
      if (onetimefeeds.length > 0) {
         const articleIds = onetimefeeds
            .filter((r: any) => r?._id)
            .map((r: any) => r?._id)

         if (articleIds.length > 0) {
            dispatch(handleGetUserBookmarks(articleIds))
         }
      }
   }, [dispatch, onetimefeeds])

   // Create bookmarks map for quick lookup
   const bookmarksMap = useMemo((): Map<string, string> => {
      return new Map((bookmarks as BookmarkItem[]).map((r: BookmarkItem) => [r.target_id.toString(), r.marked]))
   }, [bookmarks])

   // Handle bookmark action
   const bookmarkArticle = useCallback(
      async (data: BookmarkData): Promise<void> => {
         await dispatch(handleBookmarkArticle({ data }))
         dispatch(updateBookmarks(data))
         
         if (data.marked === 'yes') {
            await postActivitySaveArticle(data.article_id)
         } else if (data.marked === 'no') {
            await deleteActivitySaveArticle(data.article_id)
         }
      },
      [dispatch]
   )

   return {
      bookmarksMap,
      bookmarkArticle,
   }
}
