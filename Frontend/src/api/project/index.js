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
	startGetProjectDetails,
	startGetProjectDetailsSuccess,
	startGetProjectDetailsFail,
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

export const getProjectDetails = (projectId) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `users/project/${projectId}`,
		actionTypes: [
			startGetProjectDetails,
			startGetProjectDetailsSuccess,
			startGetProjectDetailsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const seekProjects =
	(requestProjectData) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `seek/requests-project`,
			actionTypes: [
				startRequestCreateProject,
				startRequestCreateProjectSuccess,
				startRequestCreateProjectFail,
			],
			variables: requestProjectData,
			dispatch,
			getState,
		});
	};

export const getMatchingProjects = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `seek/founder/matching-projects`,
		actionTypes: [
			startRequestSeekProjects,
			startRequestSeekProjectsSuccess,
			startRequestSeekProjectsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
