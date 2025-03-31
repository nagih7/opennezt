import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { updateArticle } from '../article'

const activitySlice = createSlice({
    name: 'Activity',
    initialState: {
        // ========== PROJECT ACCESS ========== //
        isLoadingAccessProject: false,
        // ========== MY PROJECT ACCESS ========== //
        myProjectAccess: [],
        isLoadingGetMyProjectAccess: false,
        // ========== ACCESS TO MY PROJECTS ========== //
        accessToMyProjects: [],
        isLoadinggGetAccessToMyProjects: false,
        // ========== TALENT ACCESS ========== //
        isLoadingAccessTalent: false,
        // ========== ACCESS TO MY PROFILE ========== //
        accessToMyProfile: [],
        isLoadingGetAccessToMyProfile: false,
        // ========== POST ACTIVITIES CREATE ARTICLE ========== //
        isLoadingCreateNewArticle: false,
        // ========== POST ACTIVITIES UPDATE ARTICLE ========== //
        isLoadingUpdateArticle: false,
        // ========== POST ACTIVITIES SAVE ARTICLE ========== //
        isLoadingSaveArticle: false,
        // ========== POST ACTIVITIES REACTION ARTICLE ========== //
        isLoadingReactionArticle: false,
        // ========== POST ACTIVITIES REPLY COMMENT ========== //
        isLoadingReplyComment: false,
        // ========== GET ACTIVITIES CREATE ARTICLE ========== //
        createNewArticleActivity: [],
        isLoadingCreateNewArticleActivity: false,
        // ========== GET ACTIVITIES UPDATE ARTICLE ========== //
        updateArticleActivity: [],
        isLoadingUpdateArticleActivity: false,
        // ========== GET ACTIVITIES SAVE ARTICLE ========== //
        saveArticleActivity: [],
        isLoadingSaveArticleActivity: false,
        // ========== GET ACTIVITIES REACTION ARTICLE ========== //
        reactionArticleActivity: [],
        isLoadingReactionArticleActivity: false,
        // ========== GET ACTIVITIES REPLY COMMENT ========== //
        replyCommentActivity: [],
        isLoadingReplyCommentActivity: false,
        // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
        deleteSaveArticleActivity: [],
        isLoadingDeleteSaveArticleActivity: false,
        // ========== DELETE REACTION ARTICLE ACTIVITIES ========== //
        deleteReactionArticleActivity: [],
        isLoadingDeleteReactionArticleActivity: false,
    },
    reducers: {
        // ========== PROJECT ACCESS ========== //
        requestAccessToProject: (state) => ({
            ...state,
            isLoadingAccessProject: true,
        }),
        accessToProjectSuccess: (state) => ({
            ...state,
            isLoadingAccessProject: false,
        }),
        accessToProjectFailure: (state) => ({
            ...state,
            isLoadingAccessProject: false,
        }),
        // ========== MY PROJECT ACCESS ========== //
        requestGetMyProjectAccess: (state) => ({
            ...state,
            isLoadingGetMyProjectAccess: true,
        }),
        getMyProjectAccessSuccess: (state, action) => ({
            ...state,
            myProjectAccess: action.payload.data,
            isLoadingGetMyProjectAccess: false,
        }),
        getMyProjectAccessFail: (state) => ({
            ...state,
            isLoadingGetMyProjectAccess: false,
        }),
        // ========== ACCESS TO MY PROJECTS ========== //
        requestGetAccessToMyProjects: (state) => ({
            ...state,
            isLoadinggGetAccessToMyProjects: true,
        }),
        getAccessToMyProjectsSuccess: (state, action) => ({
            ...state,
            accessToMyProjects: action.payload.data,
            isLoadinggGetAccessToMyProjects: false,
        }),
        getAccessToMyProjectsFail: (state) => ({
            ...state,
            isLoadinggGetAccessToMyProjects: false,
        }),
        // ========== TALENT ACCESS ========== //
        requestAccessToTalent: (state) => ({
            ...state,
            isLoadingAccessTalent: true,
        }),
        accessToTalentSuccess: (state) => ({
            ...state,
            isLoadingAccessTalent: false,
        }),
        accessToTalentFailure: (state) => ({
            ...state,
            isLoadingAccessTalent: false,
        }),
        // ========== ACCESS TO MY PROFILE ========== //
        requestGetAccessToMyProfile: (state) => ({
            ...state,
            isLoadingGetAccessToMyProfile: true,
        }),
        getAccessToMyProfileSuccess: (state, action) => ({
            ...state,
            accessToMyProfile: action.payload.data,
            isLoadingGetAccessToMyProfile: false,
        }),
        getAccessToMyProfileFail: (state) => ({
            ...state,
            isLoadingGetAccessToMyProfile: false,
        }),
        // ========== ACTIVITIES CREATE ARTICLE ========== //
        requestGetActivityCreateArticle: (state) => ({
            ...state,
            isLoadingCreateNewArticle: true,
        }),
        getActivityCreateArticleSuccess: (state, action) => ({
            ...state,
            createNewArticleActivity: action.payload.data,
            isLoadingCreateNewArticle: false,
        }),
        getActivityCreateArticleFail: (state) => ({
            ...state,
            isLoadingCreateNewArticle: false,
        }),
        // ========== ACTIVITIES UPDATE ARTICLE ========== //
        requestGetActivityUpdateArticle: (state) => ({
            ...state,
            isLoadingUpdateArticle: true,
        }),
        getActivityUpdateArticleSuccess: (state, action) => ({
            ...state,
            updateArticleActivity: action.payload.data,
            isLoadingUpdateArticle: false,
        }),
        getActivityUpdateArticleFail: (state) => ({
            ...state,
            isLoadingUpdateArticle: false,
        }),
        // ========== ACTIVITIES SAVE ARTICLE ========== //
        requestGetActivitySaveArticle: (state) => ({
            ...state,
            isLoadingSaveArticle: true,
        }),
        getActivitySaveArticleSuccess: (state, action) => ({
            ...state,
            saveArticleActivity: action.payload.data,
            isLoadingSaveArticle: false,
        }),
        getActivitySaveArticleFail: (state) => ({
            ...state,
            isLoadingSaveArticle: false,
        }),
        // ========== ACTIVITIES REACTION ARTICLE ========== //
        requestGetActivityReactionArticle: (state) => ({
            ...state,
            isLoadingReactionArticle: true,
        }),
        getActivityReactionArticleSuccess: (state, action) => ({
            ...state,
            reactionArticleActivity: action.payload.data,
            isLoadingReactionArticle: false,
        }),
        getActivityReactionArticleFail: (state) => ({
            ...state,
            isLoadingReactionArticle: false,
        }),
        // ========== ACTIVITIES REPLY COMMENT ========== //
        requestGetActivityReplyComment: (state) => ({
            ...state,
            isLoadingReplyComment: true,
        }),
        getActivityReplyCommentSuccess: (state, action) => ({
            ...state,
            replyCommentActivity: action.payload.data,
            isLoadingReplyComment: false,
        }),
        getActivityReplyCommentFail: (state) => ({
            ...state,
            isLoadingReplyComment: false,
        }),
        // ========== POST ACTIVITIES CREATE ARTICLE ========== //
        requestPostActivityCreateArticle: (state) => ({
            ...state,
            isLoadingCreateNewArticle: true,
        }),
        postActivityCreateArticleSuccess: (state) => ({
            ...state,
            isLoadingCreateNewArticle: false,
        }),
        postActivityCreateArticleFail: (state) => ({
            ...state,
            isLoadingCreateNewArticle: false,
        }),
        // ========== POST ACTIVITIES UPDATE ARTICLE ========== //
        requestPostActivityUpdateArticle: (state) => ({
            ...state,
            isLoadingUpdateArticleActivity: true,
        }),
        postActivityUpdateArticleSuccess: (state) => ({
            ...state,
            isLoadingUpdateArticle: false,
        }),
        postActivityUpdateArticleFail: (state) => ({
            ...state,
            isLoadingUpdateArticle: false,
        }),
        // ========== POST ACTIVITIES SAVE ARTICLE ========== //
        requestPostActivitySaveArticle: (state) => ({
            ...state,
            isLoadingSaveArticle: true,
        }),
        postActivitySaveArticleSuccess: (state) => ({
            ...state,
            isLoadingSaveArticle: false,
        }),
        postActivitySaveArticleFail: (state) => ({
            ...state,
            isLoadingSaveArticle: false,
        }),
        // ========== POST ACTIVITIES REACTION ARTICLE ========== //
        requestPostActivityReactionArticle: (state) => ({
            ...state,
            isLoadingReactionArticle: true,
        }),
        postActivityReactionArticleSuccess: (state) => ({
            ...state,
            isLoadingReactionArticle: false,
        }),
        postActivityReactionArticleFail: (state) => ({
            ...state,
            isLoadingReactionArticle: false,
        }),
        // ========== POST ACTIVITIES REPLY COMMENT ========== //
        requestPostActivityReplyComment: (state) => ({
            ...state,
            isLoadingReplyComment: true,
        }),
        postActivityReplyCommentSuccess: (state) => ({
            ...state,
            isLoadingReplyComment: false,
        }),
        postActivityReplyCommentFail: (state) => ({
            ...state,
            isLoadingReplyComment: false,
        }),
        // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
        requestDeleteSaveArticleActivity: (state) => ({
            ...state,
            isLoadingDeleteSaveArticleActivity: true,
        }),
        deleteSaveArticleActivitySuccess: (state) => ({
            ...state,
            isLoadingDeleteSaveArticleActivity: false,
        }),
        deleteSaveArticleActivityFail: (state) => ({
            ...state,
            isLoadingDeleteSaveArticleActivity: false,
        }),
        // ========== DELETE REACTION ARTICLE ACTIVITIES ========== //
        requestDeleteReactionArticleActivity: (state) => ({
            ...state,
            isLoadingDeleteReactionArticleActivity: true,
        }),
        deleteReactionArticleActivitySuccess: (state) => ({
            ...state,
            isLoadingDeleteReactionArticleActivity: false,
        }),
        deleteReactionArticleActivityFail: (state) => ({
            ...state,
            isLoadingDeleteReactionArticleActivity: false,
        }),
    },
})

export const {
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
    // ========== GET CREATE ARTICLE ========== //
    requestGetActivityCreateArticle,
    getActivityCreateArticleSuccess,
    getActivityCreateArticleFail,
    // ========== GET UPDATE ARTICLE ========== //
    requestGetActivityUpdateArticle,
    getActivityUpdateArticleSuccess,
    getActivityUpdateArticleFail,
    // ========== GET SAVE ARTICLE ========== //
    requestGetActivitySaveArticle,
    getActivitySaveArticleSuccess,
    getActivitySaveArticleFail,
    // ========== GET REACTION ARTICLE ========== //
    requestGetActivityReactionArticle,
    getActivityReactionArticleSuccess,
    getActivityReactionArticleFail,
    // ========== GET REPLY COMMENT ========== //
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
} = activitySlice.actions

export default activitySlice.reducer
