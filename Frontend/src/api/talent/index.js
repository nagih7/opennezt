import callApi from "api/callApi";
import {
	startRequestRecruitTalents,
	startRequestRecruitTalentsSuccess,
	startRequestRecruitTalentsFail,
	startRequestSkipTalent,
	startRequestSkipTalentSuccess,
	startRequestSkipTalentFail,
	startRequestGetDetailTalent,
	startRequestGetDetailTalentSuccess,
	startRequestGetDetailTalentFail,
} from "../../states/modules/talent";

export const recruitTalents =
	(requestRecruitTalents) => async (dispatch, getState) => {
		requestRecruitTalents = new URLSearchParams(
			requestRecruitTalents
		).toString();
		return callApi({
			method: "get",
			apiPath: `users/recruit-talents?${requestRecruitTalents}`,
			actionTypes: [
				startRequestRecruitTalents,
				startRequestRecruitTalentsSuccess,
				startRequestRecruitTalentsFail,
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
