export interface PaginationState {
   nextCursor: Date
   limit: number
   hasMore: boolean
}

export interface CommentPaginationState {
   page: number
   limit: number
   hasMore: boolean
}

export interface ArticleState {
   feeds: any[]
   onetimefeeds: any[]
   reactions: any[]
   isLoadingGetFeeds: boolean
   isLoadingGetUserReactions: boolean
   isLoadingReactArticle: boolean
   isLoadingCreateArticle: boolean
   isOpenCreateForm: boolean
   pagination: PaginationState
   comment: any[]
   createdComment: any | null
   onetimecomments: any[]
   isLoadingGetComments: boolean
   comment_reactions: any[]
   isLoadingGetUserCommentReactions: boolean
   comment_pagination: CommentPaginationState
   isLoadingReactComment: boolean
   isLoadingCreateComment: boolean
   isLoadingUpdateArticle: boolean
   isOpenUpdateForm: boolean
   isLoadingDeleteArticle: boolean
   replyComments: any[]
   isLoadingGetReplyComments: boolean
   reply_comments_pagination: CommentPaginationState
   projectsToTag: any[]
   isLoadingMyProjectToTag: boolean
   isLoadingReplyComment: boolean
   repliedComment: any
   reply_comment_reactions: any[]
   isLoadingGetReplyCommentReactions: boolean
   isLoadingBookmarkArticle: boolean
   bookmarks: any[]
   isLoadingGetBookmarks: boolean
   // Add any other properties you need
   [key: string]: any
}
