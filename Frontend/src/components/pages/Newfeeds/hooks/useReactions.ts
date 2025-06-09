import { useEffect, useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { getUserReactionsList, handleReactArticle } from '~/api/newfeeds'
import { updateReaction } from '~/store/modules/article'
import { UserReaction } from '~/types'

/**
 * Custom hook for managing article reactions
 */
export const useReactions = (onetimefeeds: any[]) => {
   const dispatch = useAppDispatch()
   
   const {
      reactions,
      isLoadingReactArticle,
   } = useAppSelector((state) => state.article)

   // Load user reactions when feeds change
   useEffect(() => {
      if (onetimefeeds.length > 0) {
         const articleIds = onetimefeeds
            .filter((feed) => feed?._id)
            .map((feed) => feed?._id)

         if (articleIds.length > 0) {
            dispatch(getUserReactionsList(articleIds))
         }
      }
   }, [onetimefeeds, dispatch])

   // Create reaction map for quick lookup
   const reactionMap = useMemo((): Map<string, string> => {
      return new Map(reactions.map((r: UserReaction) => [r.target_id.toString(), r.type]))
   }, [reactions])

   // Handle reaction click
   const handleReaction = useCallback(
      async (articleId: string, formData: FormData): Promise<void> => {
         const reactionType = formData.get('type') as string
         await dispatch(updateReaction({ articleId, reactionType }))
         await dispatch(handleReactArticle({ articleId, data: formData }))
      },
      [dispatch]
   )

   return {
      reactionMap,
      handleReaction,
      isLoadingReactArticle,
   }
}
