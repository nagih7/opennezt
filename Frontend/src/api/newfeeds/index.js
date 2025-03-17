import callApi from "api/callApi";
import {
   getList,
   getListSuccess,
   getListFail,
   getUserReactions,
   getUserReactionsSuccess,
   getUserReactionsFail,
   reactArticle,
   reactArticleFail,
   reactArticleSuccess,
   createArticle,
   createArticleSuccess,
   createArticleFail,
   getListCommentSuccess,
   getListCommentFail,
   getListComment,
   getUserCommentReactions,
   getUserCommentReactionsSuccess,
   getUserCommentReactionsFail,
   reactComment,
   reactCommentSuccess,
   reactCommentFail,
   createComment,
   createCommentSuccess,
   createCommentFail,
} from "states/modules/article";

export const getListFeeds =
   (
      dataFilter = {
         limit: 5,
      }
   ) =>
   async (dispatch, getState) => {
      let path = `article/article-list?cursor=${dataFilter.cursor}&limit=${dataFilter.limit}`;
      return callApi({
         method: "get",
         apiPath: path,
         actionTypes: [getList, getListSuccess, getListFail],
         variables: {},
         dispatch,
         getState,
      });
   };

export const getUserReactionsList = (id) => async (dispatch, getState) => {
   const path = `article/user-reactions/${id}`;
   return callApi({
      method: "get",
      apiPath: path,
      actionTypes: [
         getUserReactions,
         getUserReactionsSuccess,
         getUserReactionsFail,
      ],
      variables: {},
      dispatch,
      getState,
   });
};

export const handleReactArticle =
   ({ articleId, data }) =>
   async (dispatch, getState) => {
      const path = `article/article-reaction/${articleId}`;
      return callApi({
         method: "post",
         apiPath: path,
         actionTypes: [reactArticle, reactArticleSuccess, reactArticleFail],
         variables: data,
         dispatch,
         getState,
      });
   };

export const handleCreateArticle =
   ({ data }) =>
   async (dispatch, getState) => {
      const path = `article`;
      console.log("data received", data);
      return callApi({
         method: "post",
         apiPath: path,
         actionTypes: [createArticle, createArticleSuccess, createArticleFail],
         variables: data,
         dispatch,
         getState,
      });
   };

export const handleGetListComment =
   (
      dataFilter = {
         limit: 10,
         page: 1,
      }
   ) =>
   async (dispatch, getState) => {
      let path = `article/list-comment?articleId=${dataFilter.articleId}&limit=${dataFilter.limit}&page=${dataFilter.page}`;
      return callApi({
         method: "get",
         apiPath: path,
         actionTypes: [
            getListComment,
            getListCommentSuccess,
            getListCommentFail,
         ],
         variables: {},
         dispatch,
         getState,
      });
   };

export const handleGetUserCommentReactions =
   (id) => async (dispatch, getState) => {
      const path = `article/user-comment-reactions/${id}`;
      return callApi({
         method: "get",
         apiPath: path,
         actionTypes: [
            getUserCommentReactions,
            getUserCommentReactionsSuccess,
            getUserCommentReactionsFail,
         ],
         variables: {},
         dispatch,
         getState,
      });
   };

export const handleReactComment =
   ({ commentId, data }) =>
   async (dispatch, getState) => {
      const path = `article/article-reaction/${commentId}`;
      return callApi({
         method: "post",
         apiPath: path,
         actionTypes: [reactComment, reactCommentSuccess, reactCommentFail],
         variables: data,
         dispatch,
         getState,
      });
   };

export const handleCreateComment =
   ({ data }) =>
   async (dispatch, getState) => {
      const path = `article/create-comment`;
      return callApi({
         method: "post",
         apiPath: path,
         actionTypes: [createComment, createCommentSuccess, createCommentFail],
         variables: data,
         dispatch,
         getState,
      });
   };
