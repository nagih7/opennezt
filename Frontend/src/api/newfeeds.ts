import callReduxApi from '~/api/callReduxApi'
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
   getListComment,
   getListCommentSuccess,
   getListCommentFail,
   getUserCommentReactions,
   getUserCommentReactionsSuccess,
   getUserCommentReactionsFail,
   reactComment,
   reactCommentSuccess,
   reactCommentFail,
   createComment,
   createCommentSuccess,
   createCommentFail,
   updateArticle,
   updateArticleSuccess,
   updateArticleFail,
   deleteArticle,
   deleteArticleSuccess,
   deleteArticleFail,
   getListReplyComment,
   getListReplyCommentSuccess,
   getListReplyCommentFail,
   requestGetProjectsToTag,
   getProjectsToTagSuccess,
   getProjectsToTagFail,
   replyComment,
   replyCommentSuccess,
   replyCommentFail,
   getUserReplyCommentReactions,
   getUserReplyCommentReactionsSuccess,
   getUserReplyCommentReactionsFail,
   bookmarkArticle,
   bookmarkArticleFail,
   bookmarkArticleSuccess,
   getUserBookmarks,
   getUserBookmarksSuccess,
   getUserBookmarksFail,
} from '~/store/modules/article'
import { AppDispatch } from '~/store'

export const getListFeeds =
   (
      dataFilter = {
         limit: 5,
         cursor: 0,
      }
   ) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      let path = `article/article-list?cursor=${dataFilter.cursor}&limit=${dataFilter.limit}`
      return callReduxApi({
         method: 'get',
         apiPath: path,
         actionTypes: [getList, getListSuccess, getListFail],
         variables: {},
         dispatch,
         getState,
      })
   }

export const getUserReactionsList = (articleIds: any) => async (dispatch: AppDispatch, getState: () => any) => {
   const path = `article/user-reactions/${articleIds.join(',')}`
   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [getUserReactions, getUserReactionsSuccess, getUserReactionsFail],
      variables: {},
      dispatch,
      getState,
   })
}

export const handleReactArticle =
   ({ articleId, data }: { articleId: string; data: FormData }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/article-reaction/${articleId}`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [reactArticle, reactArticleSuccess, reactArticleFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleCreateArticle =
   ({ data }: { data: FormData }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [createArticle, createArticleSuccess, createArticleFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleGetListComment =
   (
      dataFilter = {
         limit: 10,
         page: 1,
         articleId: '',
      }
   ) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      let path = `article/list-comments?articleId=${dataFilter.articleId}&limit=${dataFilter.limit}&page=${dataFilter.page}`
      return callReduxApi({
         method: 'get',
         apiPath: path,
         actionTypes: [getListComment, getListCommentSuccess, getListCommentFail],
         variables: {},
         dispatch,
         getState,
      })
   }

export const handleGetUserCommentReactions = (id: any) => async (dispatch: AppDispatch, getState: () => any) => {
   const path = `article/user-comment-reactions/${id.join(',')}`
   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [getUserCommentReactions, getUserCommentReactionsSuccess, getUserCommentReactionsFail],
      variables: {},
      dispatch,
      getState,
   })
}

export const handleReactComment =
   ({ commentId, data }: { commentId: string; data: FormData }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/article-reaction/${commentId}`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [reactComment, reactCommentSuccess, reactCommentFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleCreateComment =
   ({ data }: { data: FormData }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/create-comment`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [createComment, createCommentSuccess, createCommentFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleUpdateArticle =
   ({ id, data }: { id: string; data: FormData }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/article-update/${id}`
      return callReduxApi({
         method: 'put',
         apiPath: path,
         actionTypes: [updateArticle, updateArticleSuccess, updateArticleFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleDeleteArticle =
   ({ id }: { id: string }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/${id}`
      return callReduxApi({
         method: 'delete',
         apiPath: path,
         actionTypes: [deleteArticle, deleteArticleSuccess, deleteArticleFail],
         variables: {},
         dispatch,
         getState,
      })
   }

export const handleGetListReplyComment =
   ({
      dataFilter = {
         limit: 3,
         page: 1,
         article_id: '',
         parent_id: '',
      },
   }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/list-reply-comment?articleId=${dataFilter.article_id}&parentId=${dataFilter.parent_id}&page=${dataFilter.page}&limit=${dataFilter.limit}`
      return callReduxApi({
         method: 'get',
         apiPath: path,
         actionTypes: [getListReplyComment, getListReplyCommentSuccess, getListReplyCommentFail],
         variables: {},
         dispatch,
         getState,
      })
   }

export const getProjectsToTag = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `projects/tags`
   if (dataFilter.keySearch) {
      path += `?keySearch=${dataFilter.keySearch}`
   }
   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetProjectsToTag, getProjectsToTagSuccess, getProjectsToTagFail],
      variables: {},
      dispatch,
      getState,
   })
}

export const handleReplyComment =
   ({ data }: { data: FormData }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      let path = `article/reply-comment`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [replyComment, replyCommentSuccess, replyCommentFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleGetUserReplyCommentReactions = (id: any) => async (dispatch: AppDispatch, getState: () => any) => {
   const path = `article/user-comment-reactions/${id.join(',')}`
   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [
         getUserReplyCommentReactions,
         getUserReplyCommentReactionsSuccess,
         getUserReplyCommentReactionsFail,
      ],
      variables: {},
      dispatch,
      getState,
   })
}

export const handleBookmarkArticle =
   ({ data }: { data: { article_id: string; marked: string } }) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      const path = `article/bookmark-article`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [bookmarkArticle, bookmarkArticleSuccess, bookmarkArticleFail],
         variables: data,
         dispatch,
         getState,
      })
   }

export const handleGetUserBookmarks = (articleIds: any) => async (dispatch: AppDispatch, getState: () => any) => {
   const path = `article/user-bookmarks/${articleIds.join(',')}`
   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [getUserBookmarks, getUserBookmarksSuccess, getUserBookmarksFail],
      variables: {},
      dispatch,
      getState,
   })
}
