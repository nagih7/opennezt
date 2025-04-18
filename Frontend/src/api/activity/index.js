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
    // ========== ACTIVITIES COMMENT ========== //
    requestGetActivityComment,
    getActivityCommentSuccess,
    getActivityCommentFail,
    // ========== GET ACTIVITIES ARTICLE ========== //
    requestGetActivities,
    getActivitiesSuccess,
    getActivitiesFail,
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
    // ========== POST ACTIVITIES COMMENT ========== //
    requestPostActivityComment,
    postActivityCommentSuccess,
    postActivityCommentFail,
    // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
    requestDeleteSaveArticleActivity,
    deleteSaveArticleActivitySuccess,
    deleteSaveArticleActivityFail,
    // ========== DELETE REACTION ARTICLE ACTIVITIES ========== //
    requestDeleteReactionArticleActivity,
    deleteReactionArticleActivitySuccess,
    deleteReactionArticleActivityFail,
    // ========== GET PROJECT DETAILS ACTIVITIES ========== //
    requestGetProjectDetailsActivity,
    getProjectDetailsActivitySuccess,
    getProjectDetailsActivityFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ BASIC ] ========== //
    requestPostProjectDetailsActivityBasic,
    postProjectDetailsActivityBasicSuccess,
    postProjectDetailsActivityBasicFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ SECTOR ] ========== //
    requestPostProjectDetailsActivitySector,
    postProjectDetailsActivitySectorSuccess,
    postProjectDetailsActivitySectorFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ REVENUE ] ========== //
    requestPostProjectDetailsActivityRevenue,
    postProjectDetailsActivityRevenueSuccess,
    postProjectDetailsActivityRevenueFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ FUNDING SOURCE ] ========== //
    requestPostProjectDetailsActivityFunding,
    postProjectDetailsActivityFundingSuccess,
    postProjectDetailsActivityFundingFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ ADDITIONAL INFO ] ========== //
    requestPostProjectDetailsActivityAdditional,
    postProjectDetailsActivityAdditionalSuccess,
    postProjectDetailsActivityAdditionalFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ LOGO ] ========== //
    requestPostProjectDetailsActivityLogo,
    postProjectDetailsActivityLogoSuccess,
    postProjectDetailsActivityLogoFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ BACKGROUND ] ========== //
    requestPostProjectDetailsActivityBackground,
    postProjectDetailsActivityBackgroundSuccess,
    postProjectDetailsActivityBackgroundFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ PROJECT REQUIREMENT ] ========== //
    requestPostProjectDetailsActivityRequirement,
    postProjectDetailsActivityRequirementSuccess,
    postProjectDetailsActivityRequirementFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ NEW MEMBER ] ========== //
    requestPostProjectDetailsActivityNewMember,
    postProjectDetailsActivityNewMemberSuccess,
    postProjectDetailsActivityNewMemberFail,
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

// ========== ACTIVITIES COMMENT ========== //
export const getComment = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `article/activity/comment`,
        actionTypes: [requestGetActivityComment, getActivityCommentSuccess, getActivityCommentFail],
        variables: {},
        dispatch,
        getState,
    })
}
// ========== GET ACTIVITIES ARTICLE ========== //
export const getActivitiesArticle =
    (options = {}) =>
    async (dispatch, getState) => {
        return callApi({
            method: 'get',
            apiPath: `article/activities`,
            actionTypes: [requestGetActivities, getActivitiesSuccess, getActivitiesFail],
            variables: options,
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

// ========== POST ACTIVITIES COMMENT ========== //
export const postActivityComment = (commentId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `article/activity/reply-comment/${commentId}`,
        actionTypes: [requestPostActivityComment, postActivityCommentSuccess, postActivityCommentFail],
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

// ========== GET PROJECT DETAILS ACTIVITIES ========== //
export const getProjectDetailsActivities = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `projects/me/${projectId}/activities`,
        actionTypes: [
            requestGetProjectDetailsActivity,
            getProjectDetailsActivitySuccess,
            getProjectDetailsActivityFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ BASIC ] ========== //
export const postProjectDetailsActivitiesBasic = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/basic/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityBasic,
            postProjectDetailsActivityBasicSuccess,
            postProjectDetailsActivityBasicFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ SECTOR ] ========== //
export const postProjectDetailsActivitiesSector = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/sector/activity`,
        actionTypes: [
            requestPostProjectDetailsActivitySector,
            postProjectDetailsActivitySectorSuccess,
            postProjectDetailsActivitySectorFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ REVENUE ] ========== //
export const postProjectDetailsActivitiesRevenue = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/revenues/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityRevenue,
            postProjectDetailsActivityRevenueSuccess,
            postProjectDetailsActivityRevenueFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ FUNDING SOURCE ] ========== //
export const postProjectDetailsActivitiesFundingSource = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/funding-sources/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityFunding,
            postProjectDetailsActivityFundingSuccess,
            postProjectDetailsActivityFundingFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ ADDITIONAL INFO ] ========== //
export const postProjectDetailsActivitiesAdditionalInfo = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/additional-infos/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityAdditional,
            postProjectDetailsActivityAdditionalSuccess,
            postProjectDetailsActivityAdditionalFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ LOGO ] ========== //
export const postProjectDetailsActivitiesLogo = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/logo/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityLogo,
            postProjectDetailsActivityLogoSuccess,
            postProjectDetailsActivityLogoFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ BACKGROUND ] ========== //
export const postProjectDetailsActivitiesBackground = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/background/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityBackground,
            postProjectDetailsActivityBackgroundSuccess,
            postProjectDetailsActivityBackgroundFail,
        ],
        variables: formRequest,
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ PROJECT REQUIREMENT ] ========== //
export const postProjectDetailsActivitiesProjectRequirement = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/requirements/activity`,
        actionTypes: [
            requestPostProjectDetailsActivityRequirement,
            postProjectDetailsActivityRequirementSuccess,
            postProjectDetailsActivityRequirementFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ NEW MEMBER ] ========== //
export const postProjectDetailsActivitiesNewMember = (invitationId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/new-member/activity/${invitationId}`,
        actionTypes: [
            requestPostProjectDetailsActivityNewMember,
            postProjectDetailsActivityNewMemberSuccess,
            postProjectDetailsActivityNewMemberFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}
