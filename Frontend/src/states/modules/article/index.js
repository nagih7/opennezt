import { createSlice } from "@reduxjs/toolkit";
import { create } from "lodash";

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
} = articleSlice.actions;

export default articleSlice.reducer;
