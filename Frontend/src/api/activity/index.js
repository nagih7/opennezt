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
		apiPath: `projects/me/access`,
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
