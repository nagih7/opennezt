import callApi from "api/callApi";
import {
	// ========== My projects ========== //
	requestGetListMyProjects,
	getListMyProjectsSuccess,
	getListMyProjectsFail,
	requestCreateNewProject,
	createNewProjectSuccess,
	createNewProjectFail,
	requestGetMyProjectDetails,
	getMyProjectDetailsSuccess,
	getMyProjectDetailsFail,
	// ========== Seek projects ========== //
	requestSeekProjects,
	seekProjectsSuccess,
	seekProjectsFail,
	//  //////////////////////
	requestGetProjectDetails,
	getProjectDetailsSuccess,
	getProjectDetailsFail,
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

// ========== My projects ========== //
export const getListMyProjects = (dataFilter) => async (dispatch, getState) => {
	let path = `projects?per_page=${dataFilter.perPage}&page=${dataFilter.currentPage}`;
	if (dataFilter.keySearch) {
		path += `&q=${dataFilter.keySearch}`;
	}
	if (dataFilter.status && dataFilter.status.length > 0) {
		path += `&status=${dataFilter.status}`;
	}

	if (dataFilter.order && dataFilter.column) {
		path += `&order=${dataFilter.order}&column=${dataFilter.column}`;
	}
	return callApi({
		method: "get",
		apiPath: path,
		actionTypes: [
			requestGetListMyProjects,
			getListMyProjectsSuccess,
			getListMyProjectsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// ========== CREATE NEW PROJECT ========== //
export const createNewProject = (data) => async (dispatch, getState) => {
	return callApi({
		method: "post",
		apiPath: "projects",
		actionTypes: [
			requestCreateNewProject,
			createNewProjectSuccess,
			createNewProjectFail,
		],
		variables: data,
		dispatch,
		getState,
	});
};

// ========== GET PROJECT DETAILS ========== //
export const getMyProjectDetails =
	(projectId) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `projects/${projectId}`,
			actionTypes: [
				requestGetMyProjectDetails,
				getMyProjectDetailsSuccess,
				getMyProjectDetailsFail,
			],
			variables: {},
			dispatch,
			getState,
		});
	};

export const getProjectDetails = (projectId) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `projects/${projectId}`,
		actionTypes: [
			requestGetProjectDetails,
			getProjectDetailsSuccess,
			getProjectDetailsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// =========== SEEK PROJECTS =========== //
export const seekProjects = (dataFilter) => async (dispatch, getState) => {
	let path = `projects/seek?page=${dataFilter.page}&per_page=${dataFilter.perPage}`;

	if (dataFilter.keySearch) {
		path += `&q=${dataFilter.keySearch}`;
	}
	if (dataFilter.industry) {
		path += `&industry=${dataFilter.industry}`;
	}
	if (dataFilter.stage) {
		path += `&stage=${dataFilter.stage}`;
	}

	return callApi({
		method: "get",
		apiPath: path,
		actionTypes: [requestSeekProjects, seekProjectsSuccess, seekProjectsFail],
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

export const getProjectInvitations =
	(user_id) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `project/invitations/${user_id}`,
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
