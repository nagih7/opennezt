import callApi from "api/callApi";

import {
	startRequestMatchingProjects,
	startRequestMatchingProjectsSuccess,
	startRequestMatchingProjectsFail,
} from "../../states/modules/artificialIntelligence";

export const matchingProjects = () => async (dispatch, getState) => {
	dispatch(startRequestMatchingProjects());
	return callApi({
		method: "get",
		apiPath: `ai/matching-projects`,
		actionTypes: [
			startRequestMatchingProjects,
			startRequestMatchingProjectsSuccess,
			startRequestMatchingProjectsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
