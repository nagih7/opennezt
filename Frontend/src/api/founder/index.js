import callApi from "api/callApi";
import {
	startRequestGetFounderProfile,
	startRequestGetFounderProfileSuccess,
	startRequestGetFounderProfileFail,
} from "../../states/modules/founder";

export const getFounderProfile = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `users/get-founder-profile`,
		actionTypes: [
			startRequestGetFounderProfile,
			startRequestGetFounderProfileSuccess,
			startRequestGetFounderProfileFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
