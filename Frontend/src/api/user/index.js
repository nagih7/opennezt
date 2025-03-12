import callApi from "../callApi";
import {
	// INDUSTRY
	requestgetIndustryFramework,
	getIndustryFrameworkSuccess,
	getIndustryFrameworkFail,
	// EXPERIENCE_LEVEL
	requestgetExperienceLevelFramwork,
	getExperienceLevelFramworkSuccess,
	getExperienceLevelFramworkFail,
} from "../../states/modules/user";

// INDUSTRY
export const getIndustryFramework = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "users/industries",
		actionTypes: [
			requestgetIndustryFramework,
			getIndustryFrameworkSuccess,
			getIndustryFrameworkFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// EXPERIENCE LEVEL
export const getExperienceLevelFramwork = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "users/experience-levels",
		actionTypes: [
			requestgetExperienceLevelFramwork,
			getExperienceLevelFramworkSuccess,
			getExperienceLevelFramworkFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
