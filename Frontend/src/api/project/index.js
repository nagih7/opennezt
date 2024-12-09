import callApi from "api/callApi";
import SeekProject from "api/seekprojectapi";
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
	startRequestSearchProjects,
	startRequestSearchProjectsSuccess,
	startRequestSearchProjectsFail,
	startRequestProjectDetails,
	startRequestProjectDetailsSuccess,
	startRequestProjectDetailsFail,
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
		return SeekProject({
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
export const searchProjects =
	(industry, name) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `seek/search-projects?industry=${industry}&name=${name}`,
			headers: {
				Authorization: `Bearer ${getState().auth.token}`,
			},
			actionTypes: [
				startRequestSearchProjects,
				startRequestSearchProjectsSuccess,
				startRequestSearchProjectsFail,
			],
			variables: {},
			dispatch,
			getState,
		});
	};
export const getrequestsProjectDetails =
	(projectData) => async (dispatch, getState) => {
		return SeekProject({
			method: "post",
			apiPath: `seek/project-details`,
			actionTypes: [
				startRequestProjectDetails,
				startRequestProjectDetailsSuccess,
				startRequestProjectDetailsFail,
			],
			variables: projectData,
			dispatch,
			getState,
		});
	};
