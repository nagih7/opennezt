import callApi from "api/callApi";

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
  // ========== POST ACTIVITIES CREATE ARTICLE ========== //
  requestPostActivityCreateArticle,
  postActivityCreateArticleSuccess,
  postActivityCreateArticleFail,
  // ========== POST ACTIVITIES UPDATE ARTICLE ========== //
  requestPostActivityUpdateArticle,
  postActivityUpdateArticleSuccess,
  postActivityUpdateArticleFail,
} from "states/modules/activity";

// ========== PROJECT ACCESS ========== //
export const accessToProject = (projectId) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `projects/${projectId}/access`,
    actionTypes: [
      requestAccessToProject,
      accessToProjectSuccess,
      accessToProjectFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

// ========== MY PROJECT ACCESS ========== //
export const getMyProjectAccess = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `projects/access/me`,
    actionTypes: [
      requestGetMyProjectAccess,
      getMyProjectAccessSuccess,
      getMyProjectAccessFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

// ========== ACCESS TO MY PROJECTS ========== //
export const getAccessToMyProjects = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `projects/me/access`,
    actionTypes: [
      requestGetAccessToMyProjects,
      getAccessToMyProjectsSuccess,
      getAccessToMyProjectsFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

// ========== TALENT ACCESS ========== //
export const accessToTalent = (profileId) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `talents/${profileId}/access`,
    actionTypes: [
      requestAccessToTalent,
      accessToTalentSuccess,
      accessToTalentFailure,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

// ========== ACCESS TO MY PROFILE ========== //
export const getAccessToMyProfile = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `profile/me/access`,
    actionTypes: [
      requestGetAccessToMyProfile,
      getAccessToMyProfileSuccess,
      getAccessToMyProfileFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

// ========== ACTIVITIES CREATE ARTICLE ========== //
export const getCreateArticle = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `article/activity/create`,
    actionTypes: [
      requestGetActivityCreateArticle,
      getActivityCreateArticleSuccess,
      getActivityCreateArticleFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};



// ========== ACTIVITIES UPDATE ARTICLE ========== //
export const getUpdateArticle = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `article/activity/update`,
    actionTypes: [
      requestGetActivityUpdateArticle,
      getActivityUpdateArticleSuccess,
      getActivityUpdateArticleFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};

// ========== POST ACTIVITIES CREATE ARTICLE ========== //
export const postActivityCreateArticle = () => async (dispatch, getState) => {
  return callApi({
	method: "post",
	apiPath: `article/activity/create`,
	actionTypes: [
		requestPostActivityCreateArticle,
		postActivityCreateArticleSuccess,
		postActivityCreateArticleFail,
	],
	variables: {},
	dispatch,
	getState,
  });
};

// ========== POST ACTIVITIES UPDATE ARTICLE ========== //
export const postActivityUpdateArticle = (articleId) => async (dispatch, getState) => {
  return callApi({
	method: "post",
	apiPath: `article/activity/update/${articleId}`,
	actionTypes: [
		requestPostActivityUpdateArticle,
		postActivityUpdateArticleSuccess,
		postActivityUpdateArticleFail,
	],
	variables: {},
	dispatch,
	getState,
  });
};
