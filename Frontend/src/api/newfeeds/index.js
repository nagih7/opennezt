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
