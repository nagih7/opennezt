import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleState } from './types'

// Define the initial state with TypeScript typing
const initialState: ArticleState = {
   feeds: [],
   onetimefeeds: [],
   reactions: [],
   isLoadingGetFeeds: false,
   isLoadingGetUserReactions: false,
   isLoadingReactArticle: false,
   isLoadingCreateArticle: false,
   isOpenCreateForm: false,
   pagination: {
      nextCursor: new Date(),
      limit: 5,
      hasMore: true,
   },
   comment: [],
   createdComment: null,
   onetimecomments: [],
   isLoadingGetComments: false,
   comment_reactions: [],
   isLoadingGetUserCommentReactions: false,
   comment_pagination: {
      page: 1,
      limit: 10,
      hasMore: true,
   },
   isLoadingReactComment: false,
   isLoadingCreateComment: false,
   articleDetails: null,
   isLoadingGetArticleDetails: false,
   attachments: [],
}

const articleSlice = createSlice({
   name: 'article',
   initialState,
   reducers: {
      // ========== GET FEEDS ========== //
      requestGetFeeds: (state: ArticleState) => ({
         ...state,
         isLoadingGetFeeds: true,
      }),
      getFeedsSuccess: (state: ArticleState, action: PayloadAction<any>) => {
         const { data, nextCursor } = action.payload.data
         return {
            ...state,
            feeds: state.pagination.nextCursor === new Date() ? data : [...state.feeds, ...data],
            pagination: {
               ...state.pagination,
               nextCursor: nextCursor || state.pagination.nextCursor,
               hasMore: !!nextCursor,
            },
            isLoadingGetFeeds: false,
         }
      },
      getFeedsFail: (state: ArticleState) => ({
         ...state,
         isLoadingGetFeeds: false,
      }),

      // ========== GET ONE TIME FEEDS ========== //
      requestGetOneTimeFeeds: (state: ArticleState) => ({
         ...state,
         isLoadingGetFeeds: true,
      }),
      getOneTimeFeedsSuccess: (state: ArticleState, action: PayloadAction<any>) => {
         return {
            ...state,
            onetimefeeds: action.payload.data,
            isLoadingGetFeeds: false,
         }
      },
      getOneTimeFeedsFail: (state: ArticleState) => ({
         ...state,
         isLoadingGetFeeds: false,
      }),

      // ========== GET USER REACTIONS ========== //
      requestGetUserReactions: (state: ArticleState) => ({
         ...state,
         isLoadingGetUserReactions: true,
      }),
      getUserReactionsSuccess: (state: ArticleState, action: PayloadAction<any>) => ({
         ...state,
         reactions: action.payload.data.likes,
         isLoadingGetUserReactions: false,
      }),
      getUserReactionsFail: (state: ArticleState) => ({
         ...state,
         isLoadingGetUserReactions: false,
      }),

      // ========== REACT ARTICLE ========== //
      requestReactArticle: (state: ArticleState) => ({
         ...state,
         isLoadingReactArticle: true,
      }),
      reactArticleSuccess: (state: ArticleState, action: PayloadAction<any>) => {
         const { article_id, like_status, count } = action.payload.data
         return {
            ...state,
            feeds: state.feeds.map((feed) => {
               if (feed._id === article_id) {
                  return {
                     ...feed,
                     likes: count,
                  }
               }
               return feed
            }),
            reactions: like_status
               ? [...state.reactions, article_id]
               : state.reactions.filter((id) => id !== article_id),
            isLoadingReactArticle: false,
         }
      },
      reactArticleFail: (state: ArticleState) => ({
         ...state,
         isLoadingReactArticle: false,
      }),

      // ========== GET ARTICLE DETAILS ========== //
      requestGetArticleDetails: (state: ArticleState) => ({
         ...state,
         isLoadingGetArticleDetails: true,
      }),
      getArticleDetailsSuccess: (state: ArticleState, action: PayloadAction<any>) => ({
         ...state,
         articleDetails: action.payload.data,
         isLoadingGetArticleDetails: false,
      }),
      getArticleDetailsFail: (state: ArticleState) => ({
         ...state,
         isLoadingGetArticleDetails: false,
      }),

      // ========== GET COMMENTS ========== //
      requestGetComments: (state: ArticleState) => ({
         ...state,
         isLoadingGetComments: true,
      }),
      getCommentsSuccess: (state: ArticleState, action: PayloadAction<any>) => {
         const { data, pagination } = action.payload.data
         return {
            ...state,
            comment: state.comment_pagination.page === 1 ? data : [...state.comment, ...data],
            comment_pagination: {
               ...state.comment_pagination,
               page: pagination.currentPage,
               hasMore: pagination.currentPage < pagination.totalPage,
            },
            isLoadingGetComments: false,
         }
      },
      getCommentsFail: (state: ArticleState) => ({
         ...state,
         isLoadingGetComments: false,
      }),

      // Add other reducers as needed based on the full state
   },
})

export const {
   // ========== GET FEEDS ========== //
   requestGetFeeds,
   getFeedsSuccess,
   getFeedsFail,
   // ========== GET ONE TIME FEEDS ========== //
   requestGetOneTimeFeeds,
   getOneTimeFeedsSuccess,
   getOneTimeFeedsFail,
   // ========== GET USER REACTIONS ========== //
   requestGetUserReactions,
   getUserReactionsSuccess,
   getUserReactionsFail,
   // ========== REACT ARTICLE ========== //
   requestReactArticle,
   reactArticleSuccess,
   reactArticleFail,
   // ========== GET ARTICLE DETAILS ========== //
   requestGetArticleDetails,
   getArticleDetailsSuccess,
   getArticleDetailsFail,
   // ========== GET COMMENTS ========== //
   requestGetComments,
   getCommentsSuccess,
   getCommentsFail,
   // Add exports for other action creators as needed
} = articleSlice.actions

export default articleSlice.reducer
