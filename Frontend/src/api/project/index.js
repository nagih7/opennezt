import callApi from "api/callApi";
import {
	// ========== MY PROJECTS ========== //
	requestGetListMyProjects,
	getListMyProjectsSuccess,
	getListMyProjectsFail,
	// ========== CREATE NEW PROJECT ========== //
	requestCreateNewProject,
	createNewProjectSuccess,
	createNewProjectFail,
	// ========== MY PROJECT DETAILS ========== //
	requestGetMyProjectDetails,
	getMyProjectDetailsSuccess,
	getMyProjectDetailsFail,
	// ========== DELETE MY PROJECT ========== //
	requestDeleteMyProject,
	deleteMyProjectSuccess,
	deleteMyProjectFail,
	// ========== SEEK PROJECTS ========== //
	requestSeekProjects,
	seekProjectsSuccess,
	seekProjectsFail,
	// ========== APPLY TO JOIN PROJECT ========== //
	requestApplyToJoinProject,
	applyToJoinProjectSuccess,
	applyToJoinProjectFail,
	// ========== PROJECT DETAILS ========== //
	requestGetProjectDetails,
	getProjectDetailsSuccess,
	getProjectDetailsFail,
} from "../../states/modules/project";

// ========== My projects ========== //
export const getListMyProjects = (dataFilter) => async (dispatch, getState) => {
	let path = `projects/me?per_page=${dataFilter.perPage}&page=${dataFilter.currentPage}`;
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
		apiPath: "projects/me/create",
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

// ========== GET MY PROJECT DETAILS ========== //
export const getMyProjectDetails =
	(projectId) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `projects/me/${projectId}/details`,
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

// ========== DELETE MY PROJECT ========== //
export const deleteMyProject = (projectId) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `projects/${projectId}/delete`,
		actionTypes: [
			requestDeleteMyProject,
			deleteMyProjectSuccess,
			deleteMyProjectFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// ========== GET PROJECT DETAILS ========== //
export const getProjectDetails = (projectId) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `projects/${projectId}/details`,
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

// =========== APPLY TO JOIN PROJECT =========== //
export const applyToJoinProject =
	(projectId, formRequest) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `projects/${projectId}/apply`,
			actionTypes: [
				requestApplyToJoinProject,
				applyToJoinProjectSuccess,
				applyToJoinProjectFail,
			],
			variables: formRequest,
			dispatch,
			getState,
		});
	};
