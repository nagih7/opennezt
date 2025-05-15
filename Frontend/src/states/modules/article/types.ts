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
   articleDetails: any | null
   isLoadingGetArticleDetails: boolean
   attachments: any[]
   [key: string]: any
}
