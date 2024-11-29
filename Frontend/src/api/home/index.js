import callApi from "api/callApi";
import {
	startCheckSteps,
	startCheckStepsSuccess,
	startCheckStepsFail,
} from "../../states/modules/home";

export const checkSteps = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `users/check-steps`,
		actionTypes: [
			startCheckSteps,
			startCheckStepsSuccess,
			startCheckStepsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
