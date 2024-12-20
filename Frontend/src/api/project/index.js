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
	startUpdateRequestStatus,
	startUpdateRequestStatusSuccess,
	startUpdateRequestStatusFail,
	startRequestUpdateBackground,
	startRequestUpdateBackgroundSuccess,
	startRequestUpdateBackgroundFail,
	startRequestGetProjectInvitations,
	startRequestGetProjectInvitationsSuccess,
	startRequestGetProjectInvitationsFail,
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

export const updateBackgroundProject =
	(formData) => async (dispatch, getState) => {
		return callApi({
			method: "put",
			apiPath: "/project/background",
			actionTypes: [
				startRequestUpdateBackground,
				startRequestUpdateBackgroundSuccess,
				startRequestUpdateBackgroundFail,
			],
			variables: formData,
			dispatch,
			getState,
		});
	};

export const getProjectInvitations = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "project/invitations",
		actionTypes: [
			startRequestGetProjectInvitations,
			startRequestGetProjectInvitationsSuccess,
			startRequestGetProjectInvitationsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
