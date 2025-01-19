import callApi from "api/callApi";

import {
	startRequestMatchingProjects,
	startRequestMatchingProjectsSuccess,
	startRequestMatchingProjectsFail,
	startRequestMatchingTalents,
	startRequestMatchingTalentsSuccess,
	startRequestMatchingTalentsFail,
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

export const matchingTalents = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `ai/matching-talents`,
		actionTypes: [
			startRequestMatchingTalents,
			startRequestMatchingTalentsSuccess,
			startRequestMatchingTalentsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
