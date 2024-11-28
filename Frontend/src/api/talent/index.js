import callApi from "api/callApi";
import {
	startRequestRecruitTalents,
	startRequestRecruitTalentsSuccess,
	startRequestRecruitTalentsFail,
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
