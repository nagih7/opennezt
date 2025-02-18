import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
   name: "article",
   initialState: {
      feeds: [],
      isLoadingGetFeeds: false,
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
         feeds: [],
         isLoadingGetFeeds: true,
      }),
      getListSuccess: (state, action) => ({
         ...state,
         isLoadingGetFeeds: false,
         feeds: [...state.feeds, ...action.payload.data.articleList],
         pagination: {
            nextCursor: action.payload.data.next_cursor,
            limit: 5,
            hasMore: action.payload.data.has_more,
         },
      }),
      getListFail: (state) => ({
         ...state,
         isLoadingGetFeeds: false,
         feeds: [],
      }),
   },
});

export const { getList, getListSuccess, getListFail } = articleSlice.actions;

export default articleSlice.reducer;
