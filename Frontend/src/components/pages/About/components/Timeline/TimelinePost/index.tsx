import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './styles.scss'
import Article from '../../../../Newfeeds/components/Article'
import NewArticle from '../../../../Newfeeds/components/NewAricle'
import {
   getListFeeds,
   getUserReactionsList,
   handleReactArticle,
   handleCreateArticle,
   handleUpdateArticle,
   handleDeleteArticle,
   handleGetUserBookmarks,
   handleBookmarkArticle,
} from '../../../../../../api/newfeeds'
import { useDispatch, useSelector } from 'react-redux'

import {
   updateDeletedArticle,
   updateReaction,
   updateUpdatedArticle,
   openCreateForm,
   closeCreateForm,
   openUpdateForm,
   closeUpdateForm,
   updateBookmarks,
} from 'store/modules/article'
import CreateArticleForm from '../../../../Newfeeds/components/CreateAricleForm'
import CommentList from '../../../../Newfeeds/components/CommentList'
import UpdateArticleForm from '../../../../Newfeeds/components/UpdateArticleForm'
import store from '~/store'
import {
   deleteActivitySaveArticle,
   getActivitiesArticle,
   postActivitySaveArticle,
   postActivityUpdateArticle,
} from 'api/activity'
import { resetLinkPreview } from 'store/modules/linkPreview'
import { AppDispatch } from '~/store'
import { RootState } from 'store/types'

// Interfaces for type safety
interface Feed {
   _id?: string
   user_id: string
   content?: {
      caption?: string
      attachment?: File[]
      hashtags?: string[]
   }
   project_id?: string
   link_preview?: string
   audience?: string
   status?: string
}

interface Reaction {
   target_id: string
   type: string
}

interface Bookmark {
   target_id: string
   marked: string
}

interface DataFilter {
   limit: number
}

interface AuthAccount {
   _id: string
}

const TimelinePost: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()

   // Typed selectors
   const {
      feeds,
      onetimefeeds,
      reactions,
      isLoadingGetFeeds,
      isLoadingReactArticle,
      isLoadingCreateArticle,
      isLoadingUpdateArticle,
      isOpenCreateForm,
      isOpenUpdateForm,
      pagination,
      bookmarks,
   } = useSelector((state: RootState) => state.article)

   const {
      activities,
      skip: activitiesSkip,
      limit: activitiesLimit,
      hasMore: hasMoreActivities,
   } = useSelector((state: RootState) => state.activity)

   const { nextCursor, limit, hasMore } = pagination

   const [dataFilter, setDataFilter] = useState<DataFilter>({
      limit: limit,
   })

   useEffect(() => {
      dispatch(getActivitiesArticle({ skip: 0, limit: activitiesLimit }))
   }, [dispatch, activitiesLimit])

   const handleLoadMoreActivities = useCallback(() => {
      if (hasMoreActivities) {
         dispatch(
            getActivitiesArticle({
               skip: activitiesSkip,
               limit: activitiesLimit,
            })
         )
      }
   }, [dispatch, activitiesSkip, activitiesLimit, hasMoreActivities])

   useEffect(() => {
      if (feeds?.length === 0 && hasMore === true) {
         dispatch(
            getListFeeds({
               limit: limit,
            })
         )
      }
   }, [dispatch, feeds?.length, limit, hasMore])

   useEffect(() => {
      if (dataFilter.limit !== limit) {
         dispatch(getListFeeds({ limit: dataFilter.limit }))
      }
   }, [dispatch, dataFilter, limit])

   const isLoadingRef = useRef(isLoadingGetFeeds)
   const cursorRef = useRef(nextCursor)

   useEffect(() => {
      isLoadingRef.current = isLoadingGetFeeds
   }, [isLoadingGetFeeds])

   useEffect(() => {
      cursorRef.current = nextCursor
   }, [nextCursor])

   const observerRef = useRef<IntersectionObserver | null>(null)

   const lastElementRef = useCallback(
      (node: HTMLElement | null) => {
         if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
         }

         if (node && hasMore) {
            observerRef.current = new IntersectionObserver(
               (entries) => {
                  const first = entries[0]
                  if (first.isIntersecting && hasMore && !isLoadingRef.current) {
                     setDataFilter({
                        limit: limit,
                     })
                  }
               },
               { threshold: 0.1 }
            )

            observerRef.current.observe(node)
         }
      },
      [hasMore, limit]
   )

   useEffect(() => {
      if (onetimefeeds.length > 0) {
         const articleIds = onetimefeeds.filter((feed: Feed) => feed?._id).map((feed: Feed) => feed?._id)

         if (articleIds.length > 0) {
            dispatch(getUserReactionsList(articleIds))
         }
      }
   }, [onetimefeeds, dispatch])

   const reactionMap = useMemo(() => {
      return new Map(reactions.map((r: Reaction) => [r.target_id.toString(), r.type]))
   }, [reactions])

   const handleOpenForm = useCallback(() => {
      dispatch(openCreateForm())
      dispatch(resetLinkPreview())
   }, [dispatch])

   const handleCloseForm = useCallback(() => {
      dispatch(closeCreateForm())
   }, [dispatch])

   const handleReaction = useCallback(
      async (articleId: string, formData: FormData) => {
         const reactionType = formData.get('type')
         await dispatch(updateReaction({ articleId, reactionType }))
         await dispatch(handleReactArticle({ articleId, data: formData }))
      },
      [dispatch]
   )

   const handleFormSubmit = useCallback(
      async (formData: {
         content: {
            caption: string
            attachment: File[]
            hashtags: string[]
         }
         audience: string
         status: string
         project_id: string
         link_preview: string
      }) => {
         const newFormData = new FormData()
         newFormData.append('caption', formData.content.caption)
         formData.content.attachment.forEach((file: File) => {
            newFormData.append('attachment', file)
         })
         newFormData.append('hashtags', JSON.stringify(formData.content.hashtags))
         newFormData.append('audience', formData.audience)
         newFormData.append('status', formData.status)
         newFormData.append('project_id', formData.project_id)
         newFormData.append('link_preview', formData.link_preview)
         dispatch(handleCreateArticle({ data: newFormData }))
      },
      [dispatch]
   )

   const [selectedArticle, setSelectedArticle] = useState<Feed>({} as Feed)
   const [isOpenComment, setIsOpenComment] = useState(false)

   const handleSelectArticle = useCallback(async (feed: Feed) => {
      setSelectedArticle(feed)
      setIsOpenComment(true)
   }, [])

   const handleCloseComment = useCallback(() => {
      setIsOpenComment(false)
      setSelectedArticle({} as Feed)
   }, [])

   const handleOpenUpdateForm = useCallback(
      async (feed: Feed) => {
         setSelectedArticle(feed)
         dispatch(openUpdateForm())
      },
      [dispatch]
   )

   const handleCloseUpdateForm = useCallback(async () => {
      setSelectedArticle({} as Feed)
      dispatch(closeUpdateForm())
   }, [dispatch])

   const handleUpdateFormSubmit = useCallback(
      async (
         id: string,
         formData: {
            content: {
               caption: string
               attachment: File[]
               hashtags: string[]
            }
            audience: string
            status: string
            project_id: string
         }
      ) => {
         const newFormData = new FormData()
         newFormData.append('caption', formData.content.caption)
         formData.content.attachment.forEach((file: File) => {
            newFormData.append('attachment', file)
         })
         newFormData.append('hashtags', JSON.stringify(formData.content.hashtags))
         newFormData.append('audience', formData.audience)
         newFormData.append('status', formData.status)
         newFormData.append('project_id', formData.project_id)
         await store.dispatch(handleUpdateArticle({ id: id, data: newFormData }))
         await store.dispatch(updateUpdatedArticle(formData))
         await postActivityUpdateArticle(id)
      },
      []
   )

   const handleDelete = useCallback(
      (id: string) => {
         dispatch(updateDeletedArticle(id))
         dispatch(handleDeleteArticle({ id }))
      },
      [dispatch]
   )

   useEffect(() => {
      if (onetimefeeds.length > 0) {
         const articleIds = onetimefeeds.filter((r: Feed) => r?._id).map((r: Feed) => r?._id)

         if (articleIds.length > 0) {
            dispatch(handleGetUserBookmarks(articleIds))
         }
      }
   }, [dispatch, onetimefeeds])

   const bookmarksMap = useMemo(() => {
      return new Map(bookmarks.map((r: Bookmark) => [r.target_id.toString(), r.marked]))
   }, [bookmarks])

   const bookmarkArticle = useCallback(
      async (data: { article_id: string; marked: string }) => {
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

   const currentUserId = useSelector((state: RootState) => state.auth.authUser) as AuthAccount

   const userFeeds = useMemo(() => {
      if (!feeds || feeds.length === 0) return []
      return feeds.filter((feed: Feed) => feed.user_id === currentUserId._id)
   }, [feeds, currentUserId])

   return (
      <div className="flex w-full gap-8 pt-4">
         <div className="w-full 2xl:w-full">
            {isOpenUpdateForm && (
               <UpdateArticleForm
                  {...({
                     feed: selectedArticle,
                     onClose: handleCloseUpdateForm,
                     onSubmit: handleUpdateFormSubmit,
                     isLoadingUpdateArticle: isLoadingUpdateArticle,
                  } as any)}
               />
            )}

            {isOpenComment && (
               <CommentList
                  key={selectedArticle?._id}
                  feed={selectedArticle}
                  onClose={handleCloseComment}
                  reaction={reactionMap.get(selectedArticle?._id || '')}
                  onReaction={handleReaction}
                  isLoading={isLoadingReactArticle}
               />
            )}

            {isOpenCreateForm && (
               <CreateArticleForm
                  {...({
                     onSubmitForm: handleFormSubmit,
                     onCloseForm: handleCloseForm,
                     isLoadingCreateArticle: isLoadingCreateArticle,
                  } as any)}
               />
            )}

            <div>
               <NewArticle onOpenForm={handleOpenForm} />
            </div>

            {userFeeds.map((feed: Feed, index: number) => {
               if (index === userFeeds.length - 1) {
                  return (
                     <Article
                        {...({
                           key: feed?._id,
                           ref: lastElementRef,
                           feed: feed,
                           reaction: reactionMap.get(feed?._id || ''),
                           onReaction: handleReaction,
                           isLoading: isLoadingReactArticle,
                           onSelect: handleSelectArticle,
                           onEdit: handleOpenUpdateForm,
                           onDelete: handleDelete,
                           bookmark: bookmarksMap.get(feed?._id || ''),
                           onBookmark: bookmarkArticle,
                        } as any)}
                     />
                  )
               } else {
                  return (
                     <Article
                        {...({
                           key: feed?._id,
                           feed: feed,
                           reaction: reactionMap.get(feed?._id || ''),
                           onReaction: handleReaction,
                           isLoading: isLoadingReactArticle,
                           onSelect: handleSelectArticle,
                           onEdit: handleOpenUpdateForm,
                           onDelete: handleDelete,
                           bookmark: bookmarksMap.get(feed?._id || ''),
                           onBookmark: bookmarkArticle,
                        } as any)}
                     />
                  )
               }
            })}
         </div>
      </div>
   )
}

export default TimelinePost
