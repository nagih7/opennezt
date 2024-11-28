import callApi from "api/callApi";
import {
	startRequestRecruitTalents,
	startRequestRecruitTalentsSuccess,
	startRequestRecruitTalentsFail,
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

export const getDetailTalent = (email) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `users/detail-talent/${email}`,
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
