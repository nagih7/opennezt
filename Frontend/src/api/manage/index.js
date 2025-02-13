import callApi from "../callApi";
import {
	startRequestGetTotalUsers,
	startRequestGetTotalUsersSuccess,
	startRequestGetTotalUsersFail,
	requestGetListRole,
	getListRoleSuccess,
	getListRoleFail,
	requestGetListType,
	getListTypeSuccess,
	getListTypeFail,
	requestGetListIndustry,
	getListIndustrySuccess,
	getListIndustryFail,
	requestCreateOrUpdateRole,
	createOrUpdateRoleSuccess,
	createOrUpdateRoleFail,
	requestCreateOrUpdateType,
	createOrUpdateTypeSuccess,
	createOrUpdateTypeFail,
	requestCreateOrUpdateIndustry,
	createOrUpdateIndustrySuccess,
	createOrUpdateIndustryFail,
	requestDeleteRole,
	deleteRoleSuccess,
	deleteRoleFail,
	requestDeleteType,
	deleteTypeSuccess,
	deleteTypeFail,
	requestDeleteIndustry,
	deleteIndustrySuccess,
	deleteIndustryFail,
} from "../../states/modules/manage";

export const getTotalUsers = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `manage/total-users`,
		actionTypes: [
			startRequestGetTotalUsers,
			startRequestGetTotalUsersSuccess,
			startRequestGetTotalUsersFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const getListRole =
	(
		dataFilter = {
			perPage: 10,
			page: 1,
		}
	) =>
	async (dispatch, getState) => {
		let path = `manage/roles?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
			actionTypes: [requestGetListRole, getListRoleSuccess, getListRoleFail],
			variables: {},
			dispatch,
			getState,
		});
	};

export const getListType = (dataFilter) => async (dispatch, getState) => {
	let path = `manage/types?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
		actionTypes: [requestGetListType, getListTypeSuccess, getListTypeFail],
		variables: {},
		dispatch,
		getState,
	});
};

export const getListIndustry = (dataFilter) => async (dispatch, getState) => {
	let path = `manage/industries?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
			requestGetListIndustry,
			getListIndustrySuccess,
			getListIndustryFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// ROLE
export const createOrUpdateRole =
	(data, action, id) => async (dispatch, getState) => {
		console.log(data);
		let path = `manage/roles`;
		if (action === "UPDATE") {
			path += `/${id}`;
		}
		return callApi({
			method: action === "CREATE" ? "post" : "put",
			apiPath: path,
			actionTypes: [
				requestCreateOrUpdateRole,
				createOrUpdateRoleSuccess,
				createOrUpdateRoleFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
export const deleteRole = (id) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `manage/roles/${id}`,
		actionTypes: [requestDeleteRole, deleteRoleSuccess, deleteRoleFail],
		variables: {},
		dispatch,
		getState,
	});
};

// TYPE
export const createOrUpdateType =
	(data, action, id) => async (dispatch, getState) => {
		let path = `manage/types`;
		if (action === "UPDATE") {
			path += `/${id}`;
		}
		return callApi({
			method: action === "CREATE" ? "post" : "put",
			apiPath: path,
			actionTypes: [
				requestCreateOrUpdateType,
				createOrUpdateTypeSuccess,
				createOrUpdateTypeFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
export const deleteType = (id) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `manage/types/${id}`,
		actionTypes: [requestDeleteType, deleteTypeSuccess, deleteTypeFail],
		variables: {},
		dispatch,
		getState,
	});
};

// INDUSTRY
export const createOrUpdateIndustry =
	(data, action, id) => async (dispatch, getState) => {
		let path = `manage/industries`;
		if (action === "UPDATE") {
			path += `/${id}`;
		}
		return callApi({
			method: action === "CREATE" ? "post" : "put",
			apiPath: path,
			actionTypes: [
				requestCreateOrUpdateIndustry,
				createOrUpdateIndustrySuccess,
				createOrUpdateIndustryFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
export const deleteIndustry = (id) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `manage/industries/${id}`,
		actionTypes: [
			requestDeleteIndustry,
			deleteIndustrySuccess,
			deleteIndustryFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
