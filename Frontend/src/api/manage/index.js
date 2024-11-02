import callApi from "../callApi";
import {
	startRequestGetTotalUsers,
	startRequestGetTotalUsersSuccess,
	startRequestGetTotalUsersFail,
} from "../../states/modules/manage";

export const getTotalUsers = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `manage/total-users`,
		actionTypes: [
			startRequestGetTotalUsers,
			startRequestGetTotalUsersSuccess,
			startRequestGetTotalUsersFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
