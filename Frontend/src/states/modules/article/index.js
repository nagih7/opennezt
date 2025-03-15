import { createSlice } from "@reduxjs/toolkit";
import { create, get } from "lodash";

const articleSlice = createSlice({
   name: "article",
   initialState: {
      feeds: [],
      onetimefeeds: [],
      reactions: [],
      isLoadingGetFeeds: false,
      isLoadingGetUserReactions: false,
      isLoadingReactArticle: false,
      isLoadingCreateArticle: false,
      pagination: {
         nextCursor: new Date(),
         limit: 5,
         hasMore: true,
      },
      comment: [],
      isLoadingGetComments: false,
      comment_reactions: [],
      isLoadingGetUserCommentReactions: false,
      comment_pagination: {
         page: 1,
         limit: 10,
         hasMore: true,
      },
   },
   // reducers: ở đây có chức năng là nhận vào state hiện tại và action, sau đó trả về một state mới
   reducers: {
      getList: (state) => ({
         ...state,
         isLoadingGetFeeds: true,
         onetimefeeds: [],
      }),
      getListSuccess: (state, action) => {
         return {
            ...state,
            feeds: [...state.feeds, ...action.payload.data.articleList],
            onetimefeeds: [...action.payload.data.articleList],
            isLoadingGetFeeds: false,
            pagination: {
               nextCursor: action.payload.data.next_cursor,
               limit: 5,
               hasMore: action.payload.data.has_more,
            },
         };
      },
      getListFail: (state) => ({
         ...state,
         isLoadingGetFeeds: false,
         feeds: [],
         onetimefeeds: [],
      }),
      getUserReactions: (state) => ({
         ...state,
         isLoadingGetUserReactions: true,
      }),
      getUserReactionsSuccess: (state, action) => ({
         ...state,
         isLoadingGetUserReactions: false,
         reactions: [...state.reactions, ...action.payload.data],
      }),
      getUserReactionsFail: (state) => ({
         ...state,
         isLoadingGetUserReactions: false,
         reactions: [],
      }),
      reactArticle: (state) => ({
         ...state,
         isLoadingReactArticle: true,
      }),
      reactArticleSuccess: (state) => ({
         ...state,
         isLoadingReactArticle: false,
      }),
      reactArticleFail: (state) => ({
         ...state,
         isLoadingReactArticle: false,
      }),
      updateReaction: (state, action) => {
         const { articleId, reactionType } = action.payload;

         //Bài viết cần chỉnh sửa reaction count
         const articleIndex = state.feeds.findIndex(
            (feed) => feed._id.toString() === articleId
         );

         const existingReactionIndex = state.reactions.findIndex(
            (r) => r.target_id.toString() === articleId
         );
         //nếu không tìm thấy trả về -1
         //tìm thấy thì thay đổi kiểu reaction
         if (existingReactionIndex !== -1) {
            if (state.reactions[existingReactionIndex].type === reactionType) {
               state.reactions.splice(existingReactionIndex, 1);
               if (articleIndex !== -1) {
                  state.feeds[articleIndex].reaction_count -= 1;
               }
            } else {
               state.reactions[existingReactionIndex].type = reactionType;
            }
         } else {
            state.reactions.push({
               target_id: articleId,
               type: reactionType,
            });
            if (articleIndex !== -1) {
               state.feeds[articleIndex].reaction_count += 1;
            }
         }
      },
      createArticle: (state) => ({
         ...state,
         isLoadingCreateArticle: true,
      }),
      createArticleSuccess: (state) => ({
         ...state,
         isLoadingCreateArticle: false,
      }),
      createArticleFail: (state) => ({
         ...state,
         isLoadingCreateArticle: false,
      }),

      //===================Comment===================
      resetComment: (state) => ({
         ...state,
         comment: [],
         pagination: {
            limit: 10,
            page: 1,
            hasMore: true,
         },
      }),
      getListComment: (state) => ({
         ...state,
         isLoadingGetComments: true,
      }),
      getListCommentSuccess: (state, action) => ({
         ...state,
         comment: [...state.comment, ...action.payload.data.commentList],
         isLoadingGetComments: false,
         comment_pagination: {
            page: action.payload.data.pagination.currentPage + 1,
            limit: 10,
            hasMore: action.payload.data.pagination.hasMore,
         },
      }),
      getListCommentFail: (state) => ({
         ...state,
         isLoadingGetComments: false,
         comment: [],
      }),
   },
});

export const {
   getList,
   getListSuccess,
   getListFail,
   getUserReactions,
   getUserReactionsSuccess,
   getUserReactionsFail,
   updateReaction,
   reactArticle,
   reactArticleSuccess,
   reactArticleFail,
   createArticle,
   createArticleSuccess,
   createArticleFail,
   resetComment,
   getListComment,
   getListCommentSuccess,
   getListCommentFail,
} = articleSlice.actions;

export default articleSlice.reducer;
