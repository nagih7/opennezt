import callApi from 'api/callApi'

import {
    // ========== PROJECT ACCESS ========== //
    requestAccessToProject,
    accessToProjectSuccess,
    accessToProjectFailure,
    // ========== MY PROJECT ACCESS ========== //
    requestGetMyProjectAccess,
    getMyProjectAccessSuccess,
    getMyProjectAccessFail,
    // ========== ACCESS TO MY PROJECTS ========== //
    requestGetAccessToMyProjects,
    getAccessToMyProjectsSuccess,
    getAccessToMyProjectsFail,
    // ========== TALENT ACCESS ========== //
    requestAccessToTalent,
    accessToTalentSuccess,
    accessToTalentFailure,
    // ========== ACCESS TO MY PROFILE ========== //
    requestGetAccessToMyProfile,
    getAccessToMyProfileSuccess,
    getAccessToMyProfileFail,
    // ========== ACTIVITIES CREATE ARTICLE ========== //
    requestGetActivityCreateArticle,
    getActivityCreateArticleSuccess,
    getActivityCreateArticleFail,
    // ========== ACTIVITIES UPDATE ARTICLE ========== //
    requestGetActivityUpdateArticle,
    getActivityUpdateArticleSuccess,
    getActivityUpdateArticleFail,
    // ========== ACTIVITIES SAVE ARTICLE ========== //
    requestGetActivitySaveArticle,
    getActivitySaveArticleSuccess,
    getActivitySaveArticleFail,
    // ========== ACTIVITIES REACTION ARTICLE ========== //
    requestGetActivityReactionArticle,
    getActivityReactionArticleSuccess,
    getActivityReactionArticleFail,
    // ========== ACTIVITIES REPLY COMMENT ========== //
    requestGetActivityReplyComment,
    getActivityReplyCommentSuccess,
    getActivityReplyCommentFail,
    // ========== POST ACTIVITIES CREATE ARTICLE ========== //
    requestPostActivityCreateArticle,
    postActivityCreateArticleSuccess,
    postActivityCreateArticleFail,
    // ========== POST ACTIVITIES UPDATE ARTICLE ========== //
    requestPostActivityUpdateArticle,
    postActivityUpdateArticleSuccess,
    postActivityUpdateArticleFail,
    // ========== POST ACTIVITIES SAVE ARTICLE ========== //
    requestPostActivitySaveArticle,
    postActivitySaveArticleSuccess,
    postActivitySaveArticleFail,
    // ========== POST ACTIVITIES REACTION ARTICLE ========== //
    requestPostActivityReactionArticle,
    postActivityReactionArticleSuccess,
    postActivityReactionArticleFail,
    // ========== POST ACTIVITIES REPLY COMMENT ========== //
    requestPostActivityReplyComment,
    postActivityReplyCommentSuccess,
    postActivityReplyCommentFail,
    // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
    requestDeleteSaveArticleActivity,
    deleteSaveArticleActivitySuccess,
    deleteSaveArticleActivityFail,
    // ========== DELETE REACTION ARTICLE ACTIVITIES ========== //
    requestDeleteReactionArticleActivity,
    deleteReactionArticleActivitySuccess,
    deleteReactionArticleActivityFail,
} from 'states/modules/activity'

// ========== PROJECT ACCESS ========== //
export const accessToProject = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/${projectId}/access`,
        actionTypes: [requestAccessToProject, accessToProjectSuccess, accessToProjectFailure],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== MY PROJECT ACCESS ========== //
export const getMyProjectAccess = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `projects/access/me`,
        actionTypes: [requestGetMyProjectAccess, getMyProjectAccessSuccess, getMyProjectAccessFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACCESS TO MY PROJECTS ========== //
export const getAccessToMyProjects = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `projects/me/access`,
        actionTypes: [requestGetAccessToMyProjects, getAccessToMyProjectsSuccess, getAccessToMyProjectsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== TALENT ACCESS ========== //
export const accessToTalent = (profileId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `talents/${profileId}/access`,
        actionTypes: [requestAccessToTalent, accessToTalentSuccess, accessToTalentFailure],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACCESS TO MY PROFILE ========== //
export const getAccessToMyProfile = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `profile/me/access`,
        actionTypes: [requestGetAccessToMyProfile, getAccessToMyProfileSuccess, getAccessToMyProfileFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACTIVITIES CREATE ARTICLE ========== //
export const getCreateArticle = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `article/activity/create`,
        actionTypes: [requestGetActivityCreateArticle, getActivityCreateArticleSuccess, getActivityCreateArticleFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACTIVITIES UPDATE ARTICLE ========== //
export const getUpdateArticle = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `article/activity/update`,
        actionTypes: [requestGetActivityUpdateArticle, getActivityUpdateArticleSuccess, getActivityUpdateArticleFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACTIVITIES SAVE ARTICLE ========== //
export const getSaveArticle = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `article/activity/save`,
        actionTypes: [requestGetActivitySaveArticle, getActivitySaveArticleSuccess, getActivitySaveArticleFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACTIVITIES REACTION ARTICLE ========== //
export const getReactionArticle = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `article/activity/reaction`,
        actionTypes: [
            requestGetActivityReactionArticle,
            getActivityReactionArticleSuccess,
            getActivityReactionArticleFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== ACTIVITIES REPLY COMMENT ========== //
export const getReplyComment = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `article/activity/reply-comment`,
        actionTypes: [requestGetActivityReplyComment, getActivityReplyCommentSuccess, getActivityReplyCommentFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== POST ACTIVITIES CREATE ARTICLE ========== //
export const postActivityCreateArticle = (articleId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `article/activity/create/${articleId}`,
        actionTypes: [
            requestPostActivityCreateArticle,
            postActivityCreateArticleSuccess,
            postActivityCreateArticleFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== POST ACTIVITIES UPDATE ARTICLE ========== //
export const postActivityUpdateArticle = (articleId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `article/activity/update/${articleId}`,
        actionTypes: [
            requestPostActivityUpdateArticle,
            postActivityUpdateArticleSuccess,
            postActivityUpdateArticleFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== POST ACTIVITIES SAVE ARTICLE ========== //
export const postActivitySaveArticle = (articleId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `article/activity/save/${articleId}`,
        actionTypes: [requestPostActivitySaveArticle, postActivitySaveArticleSuccess, postActivitySaveArticleFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== POST ACTIVITIES REACTION ARTICLE ========== //
export const postActivityReactionArticle = (articleId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `article/activity/reaction/${articleId}`,
        actionTypes: [
            requestPostActivityReactionArticle,
            postActivityReactionArticleSuccess,
            postActivityReactionArticleFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== POST ACTIVITIES REPLY COMMENT ========== //
export const postActivityReplyComment = (commentId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `article/activity/reply-comment/${commentId}`,
        actionTypes: [requestPostActivityReplyComment, postActivityReplyCommentSuccess, postActivityReplyCommentFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== DELETE ACTIVITIES SAVE ARTICLE ========== //
export const deleteActivitySaveArticle = (avitityId) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `article/activity/save/${avitityId}`,
        actionTypes: [
            requestDeleteSaveArticleActivity,
            deleteSaveArticleActivitySuccess,
            deleteSaveArticleActivityFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== DELETE ACTIVITIES REACTION ARTICLE ========== //
export const deleteActivityReactionArticle = (avitityId) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `article/activity/reaction/${avitityId}`,
        actionTypes: [
            requestDeleteReactionArticleActivity,
            deleteReactionArticleActivitySuccess,
            deleteReactionArticleActivityFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}
