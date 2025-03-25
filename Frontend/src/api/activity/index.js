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
