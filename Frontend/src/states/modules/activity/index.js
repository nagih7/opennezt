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
        // ========== POST ACTIVITIES COMMENT ========== //
        isLoadingComment: false,
        // ========== GET ACTIVITIES ARTICLE ========== //
        activities: [],
        isLoadingActivities: false,
        hasMore: true,
        skip: 0,
        limit: 10,
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
        // ========== GET ACTIVITIES COMMENT ========== //
        commentActivity: [],
        isLoadingCommentActivity: false,
        // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
        deleteSaveArticleActivity: [],
        isLoadingDeleteSaveArticleActivity: false,
        // ========== DELETE REACTION ARTICLE ACTIVITIES ========== //
        deleteReactionArticleActivity: [],
        isLoadingDeleteReactionArticleActivity: false,
        // ========== GET PROJECT DETAILS ACTIVITIES ========== //
        projectDetailsActivity: [],
        isLoadingProjectDetailsActivity: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ BASIC ] ========== //
        isLoadingPostProjectDetailsActivityBasic: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ SECTOR ] ========== //
        isLoadingPostProjectDetailsActivitySector: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ REVENUE ] ========== //
        isLoadingPostProjectDetailsActivityRevenue: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ FUNDING ] ========== //
        isLoadingPostProjectDetailsActivityFunding: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ ADDITIONAL ] ========== //
        isLoadingPostProjectDetailsActivityAdditional: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ LOGO ] ========== //
        isLoadingPostProjectDetailsActivityLogo: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ BACKGROUND ] ========== //
        isLoadingPostProjectDetailsActivityBackground: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ REQUIREMENT ] ========== //
        isLoadingPostProjectDetailsActivityRequirement: false,
        // ========== POST PROJECT DETAILS ACTIVITIES [ NEW MEMBER ] ========== //
        isLoadingPostProjectDetailsActivityNewMember: false,
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
        // ========== ACTIVITIES COMMENT ========== //
        requestGetActivityComment: (state) => ({
            ...state,
            isLoadingComment: true,
        }),
        getActivityCommentSuccess: (state, action) => ({
            ...state,
            commentActivity: action.payload.data,
            isLoadingComment: false,
        }),
        getActivityCommentFail: (state) => ({
            ...state,
            isLoadingComment: false,
        }),
        // ========== GET ACTIVITIES ARTICLE ========== //
        requestGetActivities: (state) => ({
            ...state,
            isLoading: true,
        }),
        getActivitiesSuccess: (state, action) => {
            const newActivities = action.payload.data
            return {
                ...state,
                // Nếu skip = 0, thay thế mảng; nếu không, thêm vào mảng hiện có
                activities: state.skip === 0 ? newActivities : [...state.activities, ...newActivities],
                isLoading: false,
                hasMore: newActivities.length >= state.limit, // Còn dữ liệu nếu số lượng trả về >= limit
                skip: state.skip + newActivities.length, // Cập nhật skip cho lần sau
            }
        },
        getActivitiesFail: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload,
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
        // ========== POST ACTIVITIES COMMENT ========== //
        requestPostActivityComment: (state) => ({
            ...state,
            isLoadingComment: true,
        }),
        postActivityCommentSuccess: (state) => ({
            ...state,
            isLoadingComment: false,
        }),
        postActivityCommentFail: (state) => ({
            ...state,
            isLoadingComment: false,
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
        // ========== GET PROJECT DETAILS ACTIVITIES ========== //
        requestGetProjectDetailsActivity: (state) => ({
            ...state,
            isLoadingProjectDetailsActivity: true,
        }),
        getProjectDetailsActivitySuccess: (state, action) => ({
            ...state,
            projectDetailsActivity: action.payload.data,
            isLoadingProjectDetailsActivity: false,
        }),
        getProjectDetailsActivityFail: (state) => ({
            ...state,
            isLoadingProjectDetailsActivity: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ BASIC ] ========== //
        requestPostProjectDetailsActivityBasic: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityBasic: true,
        }),
        postProjectDetailsActivityBasicSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityBasic: false,
        }),
        postProjectDetailsActivityBasicFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityBasic: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ SECTOR ] ========== //
        requestPostProjectDetailsActivitySector: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivitySector: true,
        }),
        postProjectDetailsActivitySectorSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivitySector: false,
        }),
        postProjectDetailsActivitySectorFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivitySector: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ REVENUE ] ========== //
        requestPostProjectDetailsActivityRevenue: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityRevenue: true,
        }),
        postProjectDetailsActivityRevenueSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityRevenue: false,
        }),
        postProjectDetailsActivityRevenueFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityRevenue: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ FUNDING ] ========== //
        requestPostProjectDetailsActivityFunding: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityFunding: true,
        }),
        postProjectDetailsActivityFundingSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityFunding: false,
        }),
        postProjectDetailsActivityFundingFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityFunding: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ ADDITIONAL ] ========== //
        requestPostProjectDetailsActivityAdditional: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityAdditional: true,
        }),
        postProjectDetailsActivityAdditionalSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityAdditional: false,
        }),
        postProjectDetailsActivityAdditionalFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityAdditional: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ LOGO ] ========== //
        requestPostProjectDetailsActivityLogo: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityLogo: true,
        }),
        postProjectDetailsActivityLogoSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityLogo: false,
        }),
        postProjectDetailsActivityLogoFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityLogo: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ BACKGROUND ] ========== //
        requestPostProjectDetailsActivityBackground: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityBackground: true,
        }),
        postProjectDetailsActivityBackgroundSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityBackground: false,
        }),
        postProjectDetailsActivityBackgroundFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityBackground: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ REQUIREMENT ] ========== //
        requestPostProjectDetailsActivityRequirement: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityRequirement: true,
        }),
        postProjectDetailsActivityRequirementSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityRequirement: false,
        }),
        postProjectDetailsActivityRequirementFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityRequirement: false,
        }),
        // ========== POST PROJECT DETAILS ACTIVITIES [ NEW MEMBER ] ========== //
        requestPostProjectDetailsActivityNewMember: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityNewMember: true,
        }),
        postProjectDetailsActivityNewMemberSuccess: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityNewMember: false,
        }),
        postProjectDetailsActivityNewMemberFail: (state) => ({
            ...state,
            isLoadingPostProjectDetailsActivityNewMember: false,
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
    // ========== GET COMMENT ========== //
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
    // ========== POST PROJECT DETAILS ACTIVITIES [ FUNDING ] ========== //
    requestPostProjectDetailsActivityFunding,
    postProjectDetailsActivityFundingSuccess,
    postProjectDetailsActivityFundingFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ ADDITIONAL ] ========== //
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
    // ========== POST PROJECT DETAILS ACTIVITIES [ REQUIREMENT ] ========== //
    requestPostProjectDetailsActivityRequirement,
    postProjectDetailsActivityRequirementSuccess,
    postProjectDetailsActivityRequirementFail,
    // ========== POST PROJECT DETAILS ACTIVITIES [ NEW MEMBER ] ========== //
    requestPostProjectDetailsActivityNewMember,
    postProjectDetailsActivityNewMemberSuccess,
    postProjectDetailsActivityNewMemberFail,
} = activitySlice.actions

export default activitySlice.reducer
