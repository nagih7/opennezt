import { memo } from 'react'
import Article from './Article'
import { Article as ArticleType } from '~/types'

interface BookmarkData {
   article_id: string
   marked: string
}

interface ArticleItemProps {
   feed: ArticleType
   reaction?: string
   onReaction: (articleId: string, formData: FormData) => Promise<void>
   isLoading: boolean
   onSelect: (feed: ArticleType) => Promise<void>
   onEdit: (feed: ArticleType) => Promise<void>
   onDelete: (id: string) => void
   bookmark?: string
   onBookmark: (data: BookmarkData) => Promise<void>
   isLast?: boolean
   lastElementRef?: (node: HTMLDivElement | null) => void
}

/**
 * Memoized Article component to prevent unnecessary re-renders
 */
const ArticleItem = memo<ArticleItemProps>(
   ({
      feed,
      reaction,
      onReaction,
      isLoading,
      onSelect,
      onEdit,
      onDelete,
      bookmark,
      onBookmark,
      isLast = false,
      lastElementRef,
   }) => {
      return (
         <Article
            ref={isLast ? lastElementRef : undefined}
            feed={feed}
            reaction={reaction}
            onReaction={onReaction}
            isLoading={isLoading}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            bookmark={bookmark}
            onBookmark={onBookmark}
         />
      )
   }
)

ArticleItem.displayName = 'ArticleItem'

export default ArticleItem
