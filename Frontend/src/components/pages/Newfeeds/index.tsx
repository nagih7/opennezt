import React from 'react'
import './styles.scss'
import NewArticle from './components/NewAricle'
import ArticleItem from './components/ArticleItem'
import RightSidebar from '~/components/common/RightSidebar'
import CreateArticleForm from './components/CreateAricleForm'
import CommentList from './components/CommentList'
import UpdateArticleForm from './components/UpdateArticleForm'
import {
   useNewFeeds,
   useInfiniteScroll,
   useReactions,
   useBookmarks,
   useArticleActions,
   useComments,
   useActivities,
   unifiedAction,
} from './hooks'

function NewFeeds(): React.ReactElement {
   // Use custom hooks for better organization
   const { feeds, onetimefeeds, isLoadingGetFeeds, loadMore } = useNewFeeds()
   const { reactionMap, handleReaction, isLoadingReactArticle } = useReactions(onetimefeeds)
   const { bookmarksMap, bookmarkArticle } = useBookmarks(onetimefeeds)
   const { activities, isLoadingActivities } = useActivities()

   const {
      selectedArticle,
      isLoadingCreateArticle,
      isLoadingUpdateArticle,
      isOpenCreateForm,
      isOpenUpdateForm,
      handleOpenForm,
      handleCloseForm,
      handleFormSubmit,
      handleOpenUpdateForm,
      handleCloseUpdateForm,
      handleUpdateFormSubmit,
      handleDelete,
      setSelectedArticle,
   } = useArticleActions()

   const {
      selectedArticle: commentSelectedArticle,
      isOpenComment,
      handleSelectArticle,
      handleCloseComment,
   } = useComments()

   // Infinite scroll functionality
   const { lastElementRef } = useInfiniteScroll({
      hasMore: loadMore.hasMore,
      isLoading: loadMore.isLoading,
      onLoadMore: () => {
         loadMore.setDataFilter({
            cursor: loadMore.nextCursor,
            limit: loadMore.limit,
         })
      },
   })

   return (
      <div className="flex w-full gap-[16px] pt-[16px] px-[16px]">
         <div className="w-full lg:w-8/12">
            {/* Update Article Form */}
            {isOpenUpdateForm && selectedArticle && (
               <UpdateArticleForm
                  feed={selectedArticle}
                  onClose={handleCloseUpdateForm}
                  onSubmit={handleUpdateFormSubmit}
                  isLoadingUpdateArticle={isLoadingUpdateArticle}
               />
            )}

            {/* Comment List */}
            {isOpenComment && commentSelectedArticle && (
               <CommentList
                  key={commentSelectedArticle._id}
                  feed={commentSelectedArticle}
                  onClose={handleCloseComment}
                  reaction={reactionMap.get(commentSelectedArticle._id)}
                  onReaction={handleReaction}
                  isLoading={isLoadingReactArticle}
               />
            )}

            {/* Create Article Form */}
            {isOpenCreateForm && (
               <CreateArticleForm
                  onSubmitForm={handleFormSubmit}
                  onCloseForm={handleCloseForm}
                  isLoadingCreateArticle={isLoadingCreateArticle}
               />
            )}

            {/* New Article Button */}
            <div>
               <NewArticle onOpenForm={handleOpenForm} />
            </div>

            {/* Articles List */}
            {feeds.map((feed, index) => (
               <ArticleItem
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
                  isLast={index === feeds.length - 1}
                  lastElementRef={lastElementRef}
               />
            ))}
         </div>

         {/* Right Sidebar */}
         <RightSidebar activities={activities} action={unifiedAction} isLoading={isLoadingActivities} />
      </div>
   )
}

export default NewFeeds

// Also export the optimized version
export { default as NewFeedsOptimized } from './components/NewFeedsOptimized'
