import callApi from "api/callApi";

import {
	// ========== PROJECT ACCESS ========== //
	requestAccessToProject,
	accessToProjectSuccess,
	accessToProjectFailure,
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
