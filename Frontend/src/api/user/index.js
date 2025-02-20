import callApi from "../callApi";
import {
	// INDUSTRY
	requestGetAllIndustries,
	getAllIndustriesSuccess,
	getAllIndustriesFail,
	// EXPERIENCE_LEVEL
	requestGetAllExperienceLevels,
	getAllExperienceLevelsSuccess,
	getAllExperienceLevelsFail,
} from "../../states/modules/user";

// INDUSTRY
export const getAllIndustries = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "users/industries",
		actionTypes: [
			requestGetAllIndustries,
			getAllIndustriesSuccess,
			getAllIndustriesFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// EXPERIENCE LEVEL
export const getAllExperienceLevels = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "users/experience-levels",
		actionTypes: [
			requestGetAllExperienceLevels,
			getAllExperienceLevelsSuccess,
			getAllExperienceLevelsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
