import callApi from "../callApi";
import {
	getList,
	getListSuccess,
	getListFail,
	getAllRole,
	getAllRoleSuccess,
	getAllRoleFail,
	createEmployee,
	createEmployeeSuccess,
	createEmployeeFail,
	updateEmployee,
	updateEmployeeSuccess,
	updateEmployeeFail,
	deleteEmployee,
	deleteEmployeeSuccess,
	deleteEmployeeFail,
} from "../../states/modules/employee";

export const getListEmployee =
	(
		dataFilter = {
			perPage: 10,
			page: 1,
		}
	) =>
	async (dispatch, getState) => {
		let path = `manage/users?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
			actionTypes: [getList, getListSuccess, getListFail],
			variables: {},
			dispatch,
			getState,
		});
	};

export const getAllRoleForEmployee = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `users/all-roles`,
		actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
		variables: {},
		dispatch,
		getState,
	});
};

export const handleCreateEmployee = (data) => async (dispatch, getState) => {
	return callApi({
		method: "post",
		apiPath: `users`,
		actionTypes: [createEmployee, createEmployeeSuccess, createEmployeeFail],
		variables: data,
		dispatch,
		getState,
	});
};

export const handleUpdateEmployee =
	(data, idEmployee) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `users/${idEmployee}`,
			actionTypes: [
				updateEmployee,
				updateEmployeeSuccess,
				updateEmployeeFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};

export const handleDeleteEmployee =
	(idEmployee) => async (dispatch, getState) => {
		return callApi({
			method: "delete",
			apiPath: `users/${idEmployee}`,
			actionTypes: [
				deleteEmployee,
				deleteEmployeeSuccess,
				deleteEmployeeFail,
			],
			variables: {},
			dispatch,
			getState,
		});
	};
