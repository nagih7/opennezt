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
