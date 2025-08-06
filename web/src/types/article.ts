// Article and News Feed related types
import { BaseUserProps } from './user'

export interface ArticleContent {
   caption: string
   attachment: File[]
   hashtags?: string[]
   image?: string | File
}

export interface ArticleFormData {
   content: ArticleContent
   audience: string
   status: string
   project_id?: string | null
   project_name?: string
   link_preview?: string
}

export interface CommentContent {
   caption: string
   image?: string | File
}

export interface CommentFormData {
  article_id: string
  content: {
    caption: string
    image: string | File
  }
  parent_id?: string
}

// export interface ReactionCount {
//    like?: number
//    love?: number
//    laugh?: number
//    wow?: number
//    sad?: number
//    angry?: number
//    total?: number
// }

export interface DataFilter {
   cursor: Date | number
   limit: number
}

export interface CommentDataFilter {
   articleId: string
   limit: number
   page: number
   parent_id?: string
   hasMore?: boolean
}

export interface UserReaction {
   _id: string
   target_id: string
   type: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry'
   user_id: string
   target_type: 'article' | 'comment'
   created_at: string
}

export interface LinkPreview {
   message: string | undefined
   url: string
   title?: string
   description?: string
   image?: string
   domain?: string
   favicon?: string
}

export interface Comment {
   _id: string
   content: CommentContent
   user: BaseUserProps[]
   created_at: string
   updated_at: string
   reaction_count: number
   reply_count: number
   parent_id?: string
   article_id: string
}

export interface Article {
   _id: string
   user: BaseUserProps[]
   project?: {
      _id: string
      name: string
   }[]
   content: ArticleContent
   reaction_count: number
   comment_count: number
   created_at: string
   updated_at: string
   link_preview?: string
   audience: string
   status: string
   parent_id?: string
}

export interface ArticleState {
   feeds: Article[]
   onetimefeeds: Article[]
   reactions: UserReaction[]
   isLoadingGetFeeds: boolean
   isLoadingReactArticle: boolean
   isLoadingCreateArticle: boolean
   isLoadingUpdateArticle: boolean
   isOpenCreateForm: boolean
   isOpenUpdateForm: boolean
   pagination: {
      nextCursor: number
      limit: number
      hasMore: boolean
   }
   bookmarks: string[]
   comment: Comment[]
   isLoadingGetComments: boolean
   comment_reactions: UserReaction[]
   comment_pagination: {
      hasMore: boolean
      page: number
      limit: number
   }
   isLoadingGetUserCommentReactions: boolean
   isLoadingReactComment: boolean
   onetimecomments: Comment[]
   createdComment: Comment | null
   projectsToTag: Array<{
      _id: string
      name: string
   }>
   isLoadingMyProjectToTag: boolean
   replyComments: Comment[]
   reply_comments_pagination: {
      hasMore: boolean
      page: number
      limit: number
   }
   isLoadingGetReplyComments: boolean
   reply_comment_reactions: UserReaction[]
   isLoadingGetReplyCommentReactions: boolean
   isLoadingCreateOrReplyComment: boolean
}

export interface ActivityState {
   activities: any[]
   isLoading: boolean
   limit: number
}

export interface AuthState {
   authUser: BaseUserProps | null
   isAuthenticated: boolean
}

export interface RootState {
   article: ArticleState
   activity: ActivityState
   auth: AuthState
   linkPreview: {
      linkDataArticle: LinkPreview | null
      isLoadingGetLinkPreview: boolean
      message: string | null
   }
}

// Component Props
export interface ArticleProps {
   feed: Article
   reaction?: string
   onReaction: (articleId: string, formData: FormData) => void
   isLoading: boolean
   onSelect: (feed: Article) => void
   onEdit: (feed: Article) => void
   onDelete: (articleId: string) => void
   onBookmark: (data: { article_id: string; marked: string }) => void
   bookmark?: string
}

export interface CommentProps {
  comment: Comment
  reaction?: string
  replyReactionMap: Map<string, string>
  onCommentReaction: (commentId: string, data: FormData) => void
  isLoading: boolean
  setParentId: (comment: Comment) => void
  replyCommentList?: ReplyCommentList
  handleClickReply: () => void
  selectComment: (comment: Comment) => void
  handleReactionReplyComment: (replyId: string, type: string) => void
}

export interface ReplyCommentProps {
  reply: Comment
  reaction?: string
  onReplyReaction: (replyId: string, data: FormData) => void
  handleReactionReplyComment: (replyId: string, type: string) => void
  handleClickReply: () => void
  selectComment: (comment: Comment) => void
}

export interface ReplyCommentList {
  replyComments: Comment[]
  pagination?: {
    hasMore: boolean
    total: number
    page: number
    limit: number
  }
}

export interface CommentListProps {
  comment: Comment[]
  reactionMap: Map<string, string>
  replyReactionMap: Map<string, string>
  onCommentReaction: (commentId: string, data: FormData) => void
  isLoading: boolean
  setParentId: (comment: Comment) => void
  replyCommentListMap: Map<string, ReplyCommentList>
  handleClickReply: () => void
  selectComment: (comment: Comment) => void
  handleReactionReplyComment: (replyId: string, type: string) => void
}

export interface NewCommentFormProps {
  onSubmit: (data: FormData) => void
  isLoading: boolean
  onClose?: () => void
  parentComment?: Comment | null
}

export interface NewArticleProps {
   onOpenForm: () => void
}

export interface UpdateArticleFormProps {
   onClose: () => void
   feed: Article
   onSubmit: (id: string, formData: ArticleFormData) => Promise<void>
   isLoadingUpdateArticle: boolean
}

export interface CreateArticleFormProps {
   onClose: () => void
   onSubmit: (formData: ArticleFormData) => Promise<void>
   isLoadingCreateArticle: boolean
}
