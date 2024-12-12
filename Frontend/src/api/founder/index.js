import callApi from "api/callApi";
import {
	startRequestGetFounderProfile,
	startRequestGetFounderProfileSuccess,
	startRequestGetFounderProfileFail,
	startUpdateFounderProfile,
	startUpdateFounderProfileSuccess,
	startUpdateFounderProfileFail,
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

export const updateFounderProfile =
	(data, method) => async (dispatch, getState) => {
		return callApi({
			method: method,
			apiPath: `users/founder-profile`,
			actionTypes: [
				startUpdateFounderProfile,
				startUpdateFounderProfileSuccess,
				startUpdateFounderProfileFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
