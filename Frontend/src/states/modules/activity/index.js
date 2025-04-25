import { createSlice } from '@reduxjs/toolkit'

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
        // ========== GET ACTIVITIES ARTICLE ========== //
        activities: [],
        isLoadingActivities: false,
        hasMore: true,
        skip: 0,
        limit: 10,
        // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
        deleteSaveArticleActivity: [],
        isLoadingDeleteSaveArticleActivity: false,
        // ========== GET PROJECT DETAILS ACTIVITIES ========== //
        projectDetailsActivity: [],
        isLoadingProjectDetailsActivity: false,
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
    // ========== GET ACTIVITIES ARTICLE ========== //
    requestGetActivities,
    getActivitiesSuccess,
    getActivitiesFail,
    // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
    requestDeleteSaveArticleActivity,
    deleteSaveArticleActivitySuccess,
    deleteSaveArticleActivityFail,
    // ========== GET PROJECT DETAILS ACTIVITIES ========== //
    requestGetProjectDetailsActivity,
    getProjectDetailsActivitySuccess,
    getProjectDetailsActivityFail,
} = activitySlice.actions

export default activitySlice.reducer
