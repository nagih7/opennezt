import callApi from "api/callApi";

import {
	startRequestSkipTalent,
	startRequestSkipTalentSuccess,
	startRequestSkipTalentFail,
	startRequestGetDetailTalent,
	startRequestGetDetailTalentSuccess,
	startRequestGetDetailTalentFail,
	// ========== NEW ========== //
	requestRecruitTalents,
	recruitTalentsSuccess,
	recruitTalentsFail,
} from "../../states/modules/talent";

// ========== RECRUIT TALENTS ========== //
export const recruitTalents = (dataFilter) => async (dispatch, getState) => {
	console.log("dataFilter", dataFilter);
	let path = `talents/recruit?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;
	if (dataFilter.keySearch) {
		path += `&q=${dataFilter.keySearch}`;
	}
	if (dataFilter.order && dataFilter.column) {
		path += `&order=${dataFilter.order}&column=${dataFilter.column}`;
	}
	if (dataFilter.industry) {
		path += `&industry=${dataFilter.industry}`;
	}
	if (dataFilter.experienceLevel) {
		path += `&experience_level=${dataFilter.experienceLevel}`;
	}
	if (dataFilter.category) {
		path += `&category=${dataFilter.category}`;
	}
	if (dataFilter.subcategory) {
		path += `&subcategory=${dataFilter.subcategory}`;
	}
	if (dataFilter.skill) {
		path += `&skill=${dataFilter.skill}`;
	}

	return callApi({
		method: "get",
		apiPath: path,
		actionTypes: [
			requestRecruitTalents,
			recruitTalentsSuccess,
			recruitTalentsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const skipTalent = (requestSkipTalent) => async (dispatch, getState) => {
	requestSkipTalent = new URLSearchParams(requestSkipTalent).toString();
	return callApi({
		method: "get",
		apiPath: `users/recruit-talents?${requestSkipTalent}`,
		actionTypes: [
			startRequestSkipTalent,
			startRequestSkipTalentSuccess,
			startRequestSkipTalentFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const getTalentDetails = (id) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `users/talent-details/${id}`,
		actionTypes: [
			startRequestGetDetailTalent,
			startRequestGetDetailTalentSuccess,
			startRequestGetDetailTalentFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
