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
	startGetProjectDetails,
	startGetProjectDetailsSuccess,
	startGetProjectDetailsFail,
	startRequestUpdateProject,
	startRequestUpdateProjectSuccess,
	startRequestUpdateProjectFail,
	startRequestDeleteProject,
	startRequestDeleteProjectSuccess,
	startRequestDeleteProjectFail,
	startGetPendingProjects,
	startGetPendingProjectsSuccess,
	startGetPendingProjectsFail,
	startUpdateRequestStatus,
	startUpdateRequestStatusSuccess,
	startUpdateRequestStatusFail,
	startRequestJoinProject,
	startRequestJoinProjectSuccess,
	startRequestJoinProjectFail,
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

export const requestToJoinProject =
	(requestProjectData) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `project/request-to-join`,
			actionTypes: [
				startRequestJoinProject,
				startRequestJoinProjectSuccess,
				startRequestJoinProjectFail,
			],
			variables: requestProjectData,
			dispatch,
			getState,
		});
	};

export const seekProjects = (data) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: data
			? `project/seek-projects?industry=${data.industry}&stage=${data.stage}&name=${data.name}`
			: `project/seek-projects`,
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

export const updateProject = (data) => async (dispatch, getState) => {
	return callApi({
		method: "put",
		apiPath: "users/project",
		actionTypes: [
			startRequestUpdateProject,
			startRequestUpdateProjectSuccess,
			startRequestUpdateProjectFail,
		],
		variables: data,
		dispatch,
		getState,
	});
};

export const deleteProject = (projectId) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: "users/project",
		actionTypes: [
			startRequestDeleteProject,
			startRequestDeleteProjectSuccess,
			startRequestDeleteProjectFail,
		],
		variables: { projectId },
		dispatch,
		getState,
	});
};

export const getPendingProjects = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `project/request-to-join`,
		actionTypes: [
			startGetPendingProjects,
			startGetPendingProjectsSuccess,
			startGetPendingProjectsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const responseRequestToJoinProject =
	(requestData) => async (dispatch, getState) => {
		return callApi({
			method: "put",
			apiPath: `project/response-request`,
			actionTypes: [
				startUpdateRequestStatus,
				startUpdateRequestStatusSuccess,
				startUpdateRequestStatusFail,
			],
			variables: {
				request_id: requestData.request_id,
				status: requestData.status,
			},
			dispatch,
			getState,
		});
	};
