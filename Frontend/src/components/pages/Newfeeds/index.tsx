import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './styles.scss'
import Article from './components/Article'
import NewArticle from './components/NewAricle'
import {
   getListFeeds,
   getUserReactionsList,
   handleReactArticle,
   handleCreateArticle,
   handleUpdateArticle,
   handleDeleteArticle,
   handleGetUserBookmarks,
   handleBookmarkArticle,
} from '../../../api/newfeeds'
import { useDispatch, useSelector } from 'react-redux'
import RightSidebar from '~/components/common/RightSidebar'
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
import CreateArticleForm from './components/CreateAricleForm'
import CommentList from './components/CommentList'
import UpdateArticleForm from './components/UpdateArticleForm'
import store from '~/store'
import {
   deleteActivitySaveArticle,
   getActivitiesArticle,
   postActivitySaveArticle,
   postActivityUpdateArticle,
} from 'api/activity'
import { resetLinkPreview } from 'store/modules/linkPreview'
import { RootState, Article as ArticleType, ArticleFormData, UserReaction, AppDispatch, DataFilter } from '~/types'

interface Activity {
   user?: {
      name?: string
   }
   activity_type?: {
      name?: string
   }
   article?: {
      caption?: string
   }
}

interface BookmarkData {
   article_id: string
   marked: string
}

interface BookmarkItem {
   target_id: string
   marked: string
}

const unifiedAction = (activity: Activity | string | null): React.ReactElement => {
   if (typeof activity === 'string' || !activity || activity === null) {
      return <span>has interacted with {activity}</span>
   }

   try {
      // Sử dụng cấu trúc dữ liệu mới từ API hợp nhất
      const { user, activity_type, article } = activity
      const displayName = user?.name || 'Someone'

      const activityTypeName = activity_type?.name
      const articleCaption = article?.caption
         ? `"${article.caption.length > 20 ? article.caption.substring(0, 20) + '...' : article.caption}"`
         : 'an article'

      // Handle by type
      switch (activityTypeName) {
         case 'save':
            return <span>You has saved {articleCaption}</span>
         case 'update':
            return <span>You has updated {articleCaption}</span>
         case 'create':
            return <span>has created {articleCaption}</span>
         case 'reply_comment':
            return <span>has replied to your comment on {articleCaption}</span>
         case 'comment':
            return <span>has commented on {articleCaption}</span>
         case 'reaction':
            return <span>liked your post {articleCaption}</span>
         default:
            return (
               <span>
                  {displayName} has interacted with {articleCaption}
               </span>
            )
      }
   } catch (error) {
      console.error('Error processing activity:', error)
      return <span>has performed an activity</span>
   }
}

function NewFeeds(): React.ReactElement {
   const dispatch = useDispatch<AppDispatch>()

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
      isLoadingActivities,
      // hasMore: hasMoreActivities,
      // skip: activitiesSkip,
      limit: activitiesLimit,
   } = useSelector((state: RootState) => state.activity)
   const { nextCursor, limit, hasMore } = pagination

   const [dataFilter, setDataFilter] = useState<DataFilter>({
      cursor: 0,
      limit: limit,
   })

   useEffect(() => {
      dispatch(getActivitiesArticle({ skip: 0, limit: activitiesLimit }))
   }, [dispatch, activitiesLimit])

   // const handleLoadMoreActivities = useCallback(() => {
   //     if (!isLoadingActivities && hasMoreActivities) {
   //         dispatch(
   //             getActivitiesArticle({
   //                 skip: activitiesSkip,
   //                 limit: activitiesLimit,
   //             })
   //         )
   //     }
   // }, [dispatch, activitiesSkip, activitiesLimit, isLoadingActivities, hasMoreActivities])

   // End Activities

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

   useEffect(() => {
      // Chỉ gọi API khi cursor thay đổi (không phải lần đầu load)
      if (dataFilter.cursor !== 0) {
         dispatch(getListFeeds(dataFilter))
      }
   }, [dispatch, dataFilter])
   //Xử lí bất đồng bộ
   const isLoadingRef = useRef(isLoadingGetFeeds) // Tạo một ref để lưu trạng thái
   const cursorRef = useRef(nextCursor)
   useEffect(() => {
      isLoadingRef.current = isLoadingGetFeeds // Cập nhật giá trị ref mỗi khi trạng thái thay đổi
   }, [isLoadingGetFeeds])
   useEffect(() => {
      cursorRef.current = nextCursor
   }, [nextCursor])
   //End   //Lướt xuống bài viết cuối thì load tiếp
   const observerRef = useRef<IntersectionObserver | null>(null)

   const lastElementRef = useCallback(
      (node: HTMLDivElement | null) => {
         // Ngắt kết nối observer cũ
         if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
         }

         // Tạo observer mới nếu có node và hasMore
         if (node && hasMore) {
            observerRef.current = new IntersectionObserver(
               (entries) => {
                  const first = entries[0]
                  if (first.isIntersecting && hasMore && !isLoadingRef.current) {
                     setDataFilter({
                        cursor: cursorRef.current,
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
   //Reaction User's Status
   // Tải trạng thái reaction của người dùng hiện tại
   useEffect(() => {
      if (onetimefeeds.length > 0) {
         // Lấy tất cả article IDs
         const articleIds = onetimefeeds.filter((feed) => feed?._id).map((feed) => feed?._id)

         // Gọi API một lần với array của IDs
         if (articleIds.length > 0) {
            dispatch(getUserReactionsList(articleIds))
         }
      }
   }, [onetimefeeds, dispatch])

   const reactionMap = useMemo((): Map<string, string> => {
      return new Map(reactions.map((r: UserReaction) => [r.target_id.toString(), r.type]))
   }, [reactions])
   //End Reaction User's Status
   //Form Create Article

   const handleOpenForm = useCallback((): void => {
      dispatch(openCreateForm())
      dispatch(resetLinkPreview())
   }, [dispatch])

   const handleCloseForm = useCallback((): void => {
      dispatch(closeCreateForm())
   }, [dispatch])

   const handleReaction = useCallback(
      async (articleId: string, formData: FormData): Promise<void> => {
         const reactionType = formData.get('type') as string
         await dispatch(updateReaction({ articleId, reactionType }))

         //Gọi API để update server
         await dispatch(handleReactArticle({ articleId, data: formData }))
      },
      [dispatch]
   )

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
   //End Form Create Article   //Comment Article
   const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null)
   const [isOpenComment, setIsOpenComment] = useState<boolean>(false)
   const handleSelectArticle = useCallback(async (feed: ArticleType): Promise<void> => {
      setSelectedArticle(feed)
      setIsOpenComment(true)
   }, [])

   const handleCloseComment = useCallback((): void => {
      setIsOpenComment(false)
      setSelectedArticle(null)
   }, []) //End Comment Article

   //Update Article
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

   const handleUpdateFormSubmit = useCallback(async (id: string, formData: ArticleFormData): Promise<void> => {
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
   }, []) //End Update Article
   //Delete Article
   const handleDelete = useCallback(
      (id: string): void => {
         dispatch(updateDeletedArticle(id))
         dispatch(handleDeleteArticle({ id }))
      },
      [dispatch]
   )

   useEffect(() => {
      if (onetimefeeds.length > 0) {
         const articleIds = onetimefeeds.filter((r: ArticleType) => r?._id).map((r: ArticleType) => r?._id)

         if (articleIds.length > 0) {
            dispatch(handleGetUserBookmarks(articleIds))
         }
      }
   }, [dispatch, onetimefeeds])

   const bookmarksMap = useMemo((): Map<string, string> => {
      return new Map((bookmarks as BookmarkItem[]).map((r: BookmarkItem) => [r.target_id.toString(), r.marked]))
   }, [bookmarks])

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
   //End Delete Article

   return (
      <div className="flex w-full gap-[16px] pt-[16px] px-[16px]">
         <div className="w-full lg:w-8/12">
            {' '}
            {isOpenUpdateForm && selectedArticle ? (
               <UpdateArticleForm
                  feed={selectedArticle}
                  onClose={handleCloseUpdateForm}
                  onSubmit={handleUpdateFormSubmit}
                  isLoadingUpdateArticle={isLoadingUpdateArticle}
               />
            ) : null}
            {isOpenComment && selectedArticle ? (
               <CommentList
                  key={selectedArticle._id}
                  feed={selectedArticle}
                  onClose={handleCloseComment}
                  reaction={reactionMap.get(selectedArticle._id)}
                  onReaction={handleReaction}
                  isLoading={isLoadingReactArticle}
               />
            ) : null}{' '}
            {isOpenCreateForm ? (
               <CreateArticleForm
                  onSubmitForm={handleFormSubmit}
                  onCloseForm={handleCloseForm}
                  isLoadingCreateArticle={isLoadingCreateArticle}
               />
            ) : null}
            <div>
               <NewArticle onOpenForm={handleOpenForm} />
            </div>
            {feeds.map((feed, index) => {
               if (index === feeds.length - 1) {
                  return (
                     <Article
                        key={feed?._id}
                        ref={lastElementRef}
                        feed={feed}
                        reaction={reactionMap.get(feed?._id)}
                        onReaction={handleReaction}
                        isLoading={isLoadingReactArticle}
                        onSelect={handleSelectArticle}
                        onEdit={handleOpenUpdateForm}
                        onDelete={handleDelete}
                        bookmark={bookmarksMap.get(feed?._id)}
                        onBookmark={bookmarkArticle}
                     />
                  )
               } else {
                  return (
                     <Article
                        key={feed?._id}
                        feed={feed}
                        reaction={reactionMap.get(feed?._id)}
                        onReaction={handleReaction}
                        isLoading={isLoadingReactArticle}
                        onSelect={handleSelectArticle}
                        onEdit={handleOpenUpdateForm}
                        onDelete={handleDelete}
                        bookmark={bookmarksMap.get(feed?._id)}
                        onBookmark={bookmarkArticle}
                     />
                  )
               }
            })}
         </div>
         <RightSidebar
            activities={activities}
            action={unifiedAction}
            isLoading={isLoadingActivities}
            // fetchMoreActivities={handleLoadMoreActivities}
         />
      </div>
   )
}

export default NewFeeds
