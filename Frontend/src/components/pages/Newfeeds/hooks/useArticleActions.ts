import { useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import {
   handleCreateArticle,
   handleUpdateArticle,
   handleDeleteArticle,
} from '~/api/newfeeds'
import {
   updateDeletedArticle,
   updateUpdatedArticle,
   openCreateForm,
   closeCreateForm,
   openUpdateForm,
   closeUpdateForm,
} from '~/store/modules/article'
import { resetLinkPreview } from '~/store/modules/linkPreview'
import { postActivityUpdateArticle } from '~/api/activity'
import store from '~/store'
import { Article as ArticleType, ArticleFormData } from '~/types'

/**
 * Custom hook for managing article CRUD operations
 */
export const useArticleActions = () => {
   const dispatch = useAppDispatch()
   
   const {
      isLoadingCreateArticle,
      isLoadingUpdateArticle,
      isOpenCreateForm,
      isOpenUpdateForm,
   } = useAppSelector((state) => state.article)

   const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null)

   // Create article form handlers
   const handleOpenForm = useCallback((): void => {
      dispatch(openCreateForm())
      dispatch(resetLinkPreview())
   }, [dispatch])

   const handleCloseForm = useCallback((): void => {
      dispatch(closeCreateForm())
   }, [dispatch])

   const handleFormSubmit = useCallback(
      async (formData: ArticleFormData): Promise<void> => {
         const newFormData = new FormData()
         newFormData.append('caption', formData.content.caption)
         formData.content.attachment.forEach((file: File) => {
            newFormData.append('attachment', file)
         })
         newFormData.append('hashtags', JSON.stringify(formData.content.hashtags))
         newFormData.append('audience', formData.audience)
         newFormData.append('status', formData.status)
         newFormData.append('project_id', formData.project_id || '')
         newFormData.append('link_preview', (formData as any).link_preview || '')
         dispatch(handleCreateArticle({ data: newFormData }))
      },
      [dispatch]
   )

   // Update article form handlers
   const handleOpenUpdateForm = useCallback(
      async (feed: ArticleType): Promise<void> => {
         setSelectedArticle(feed)
         dispatch(openUpdateForm())
      },
      [dispatch]
   )

   const handleCloseUpdateForm = useCallback(async (): Promise<void> => {
      setSelectedArticle(null)
      dispatch(closeUpdateForm())
   }, [dispatch])

   const handleUpdateFormSubmit = useCallback(
      async (id: string, formData: ArticleFormData): Promise<void> => {
         const newFormData = new FormData()
         newFormData.append('caption', formData.content.caption)
         formData.content.attachment.forEach((file: File) => {
            newFormData.append('attachment', file)
         })
         newFormData.append('hashtags', JSON.stringify(formData.content.hashtags))
         newFormData.append('audience', formData.audience)
         newFormData.append('status', formData.status)
         newFormData.append('project_id', formData.project_id || '')
         await store.dispatch(handleUpdateArticle({ id: id, data: newFormData }))
         await store.dispatch(updateUpdatedArticle(formData))
         await postActivityUpdateArticle(id)
      },
      []
   )

   // Delete article handler
   const handleDelete = useCallback(
      (id: string): void => {
         dispatch(updateDeletedArticle(id))
         dispatch(handleDeleteArticle({ id }))
      },
      [dispatch]
   )

   return {
      // State
      selectedArticle,
      isLoadingCreateArticle,
      isLoadingUpdateArticle,
      isOpenCreateForm,
      isOpenUpdateForm,
      
      // Create handlers
      handleOpenForm,
      handleCloseForm,
      handleFormSubmit,
      
      // Update handlers
      handleOpenUpdateForm,
      handleCloseUpdateForm,
      handleUpdateFormSubmit,
      
      // Delete handler
      handleDelete,
      
      // Setters
      setSelectedArticle,
   }
}
