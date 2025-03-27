import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import { updateArticle } from "../article";

const activitySlice = createSlice({
  name: "Activity",
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
    // ========== GET ACTIVITIES CREATE ARTICLE ========== //
    createNewArticleActivity: [],
    isLoadingCreateNewArticleActivity: false,
    // ========== ACTIVITIES UPDATE ARTICLE ========== //
    updateArticleActivity: [],
    isLoadingUpdateArticleActivity: false,
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
  },
});

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
  // ========== CREATE ARTICLE ========== //
  requestGetActivityCreateArticle,
  getActivityCreateArticleSuccess,
  getActivityCreateArticleFail,
  // ========== UPDATE ARTICLE ========== //
  requestGetActivityUpdateArticle,
  getActivityUpdateArticleSuccess,
  getActivityUpdateArticleFail,
  // ========== POST ACTIVITIES CREATE ARTICLE ========== //
  requestPostActivityCreateArticle,
  postActivityCreateArticleSuccess,
  postActivityCreateArticleFail,
  // ========== POST ACTIVITIES UPDATE ARTICLE ========== //
  requestPostActivityUpdateArticle,
  postActivityUpdateArticleSuccess,
  postActivityUpdateArticleFail,
} = activitySlice.actions;

export default activitySlice.reducer;
