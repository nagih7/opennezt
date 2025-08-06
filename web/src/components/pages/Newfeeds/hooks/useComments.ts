import { useState, useCallback } from 'react'
import { Article as ArticleType } from '~/types'

/**
 * Custom hook for managing comment functionality
 */
export const useComments = () => {
   const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null)
   const [isOpenComment, setIsOpenComment] = useState<boolean>(false)

   const handleSelectArticle = useCallback(async (feed: ArticleType): Promise<void> => {
      setSelectedArticle(feed)
      setIsOpenComment(true)
   }, [])

   const handleCloseComment = useCallback((): void => {
      setIsOpenComment(false)
      setSelectedArticle(null)
   }, [])

   return {
      selectedArticle,
      isOpenComment,
      handleSelectArticle,
      handleCloseComment,
   }
}
