import callApi from "api/callApi";

import {
	startRequestGetProjects,
	startRequestGetProjectsSuccess,
	startRequestGetProjectsFail,
	startRequestCreateNewProject,
	startRequestCreateNewProjectSuccess,
	startRequestCreateNewProjectFail,
} from "../../states/modules/project";

export const getProjects = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "users/projects",
		actionTypes: [
			startRequestGetProjects,
			startRequestGetProjectsSuccess,
			startRequestGetProjectsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const createNewProject = (data) => async (dispatch, getState) => {
	return callApi({
		method: "post",
		apiPath: "users/project",
		actionTypes: [
			startRequestCreateNewProject,
			startRequestCreateNewProjectSuccess,
			startRequestCreateNewProjectFail,
		],
		variables: data,
		dispatch,
		getState,
	});
};
