import callApi from "api/callApi";

import {
	startRequestGetProjects,
	startRequestGetProjectsSuccess,
	startRequestGetProjectsFail,
	startRequestCreateNewProject,
	startRequestCreateNewProjectSuccess,
	startRequestCreateNewProjectFail,
	startRequestSeekProjects,
	startRequestSeekProjectsSuccess,
	startRequestSeekProjectsFail,
	startRequestCreateProject,
	startRequestCreateProjectSuccess,
	startRequestCreateProjectFail,
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

export const seekProjects = (requestData) => async (dispatch, getState) => {
	return callApi({
		method: "post",
		apiPath: `seek/requests-project`,
		actionTypes: [
			startRequestSeekProjects,
			startRequestSeekProjectsSuccess,
			startRequestSeekProjectsFail,
		],
		variables: requestData,
		dispatch,
		getState,
	});
};

export const getMatchingProjects =
	(founder_id) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `seek/founder/${founder_id}/matching-projects`,
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
