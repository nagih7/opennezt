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
	requestCreateOrUpdateRole,
	createOrUpdateRoleSuccess,
	createOrUpdateRoleFail,
	requestCreateOrUpdateType,
	createOrUpdateTypeSuccess,
	createOrUpdateTypeFail,
	// INDUSTRY
	requestGetListIndustry,
	getListIndustrySuccess,
	getListIndustryFail,
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
	// EXPERIENCE LEVELS
	requestGetListExperienceLevel,
	getListExperienceLevelSuccess,
	getListExperienceLevelFail,
	requestCreateOrUpdateExperienceLevel,
	createOrUpdateExperienceLevelSuccess,
	createOrUpdateExperienceLevelFail,
	requestDeleteExperienceLevel,
	deleteExperienceLevelSuccess,
	deleteExperienceLevelFail,
	// CATEGORIES
	requestGetListCategory,
	getListCategorySuccess,
	getListCategoryFail,
	requestCreateOrUpdateCategory,
	createOrUpdateCategorySuccess,
	createOrUpdateCategoryFail,
	requestDeleteCategory,
	deleteCategorySuccess,
	deleteCategoryFail,
	// SKILLS
	requestGetListSkill,
	getListSkillSuccess,
	getListSkillFail,
	requestCreateOrUpdateSkill,
	createOrUpdateSkillSuccess,
	createOrUpdateSkillFail,
	requestDeleteSkill,
	deleteSkillSuccess,
	deleteSkillFail,
	requestGetSkillCategories,
	getSkillCategoriesSuccess,
	getSkillCategoriesFail,
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

// ROLE
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

// EXPERIENCE LEVELS
export const getListExperienceLevel =
	(dataFilter) => async (dispatch, getState) => {
		let path = `manage/experience-levels?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
				requestGetListExperienceLevel,
				getListExperienceLevelSuccess,
				getListExperienceLevelFail,
			],
			variables: {},
			dispatch,
			getState,
		});
	};
export const createOrUpdateExperienceLevel =
	(data, action, id) => async (dispatch, getState) => {
		let path = `manage/experience-levels`;
		if (action === "UPDATE") {
			path += `/${id}`;
		}
		return callApi({
			method: action === "CREATE" ? "post" : "put",
			apiPath: path,
			actionTypes: [
				requestCreateOrUpdateExperienceLevel,
				createOrUpdateExperienceLevelSuccess,
				createOrUpdateExperienceLevelFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
export const deleteExperienceLevel = (id) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `manage/experience-levels/${id}`,
		actionTypes: [
			requestDeleteExperienceLevel,
			deleteExperienceLevelSuccess,
			deleteExperienceLevelFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// CATEGORIES
export const getListCategory = (dataFilter) => async (dispatch, getState) => {
	let path = `manage/categories?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
			requestGetListCategory,
			getListCategorySuccess,
			getListCategoryFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
export const createOrUpdateCategory =
	(data, action, id) => async (dispatch, getState) => {
		let path = `manage/categories`;
		if (action === "UPDATE") {
			path += `/${id}`;
		}
		return callApi({
			method: action === "CREATE" ? "post" : "put",
			apiPath: path,
			actionTypes: [
				requestCreateOrUpdateCategory,
				createOrUpdateCategorySuccess,
				createOrUpdateCategoryFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
export const deleteCategory = (id) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `manage/categories/${id}`,
		actionTypes: [
			requestDeleteCategory,
			deleteCategorySuccess,
			deleteCategoryFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

// SKILLS
export const getListSkill = (dataFilter) => async (dispatch, getState) => {
	let path = `manage/skills?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
		actionTypes: [requestGetListSkill, getListSkillSuccess, getListSkillFail],
		variables: {},
		dispatch,
		getState,
	});
};
export const createOrUpdateSkill =
	(data, action, id) => async (dispatch, getState) => {
		let path = `manage/skills`;
		if (action === "UPDATE") {
			path += `/${id}`;
		}
		return callApi({
			method: action === "CREATE" ? "post" : "put",
			apiPath: path,
			actionTypes: [
				requestCreateOrUpdateSkill,
				createOrUpdateSkillSuccess,
				createOrUpdateSkillFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
export const deleteSkill = (id) => async (dispatch, getState) => {
	return callApi({
		method: "delete",
		apiPath: `manage/skills/${id}`,
		actionTypes: [requestDeleteSkill, deleteSkillSuccess, deleteSkillFail],
		variables: {},
		dispatch,
		getState,
	});
};

export const getSkillCategories = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `manage/skills/categories`,
		actionTypes: [
			requestGetSkillCategories,
			getSkillCategoriesSuccess,
			getSkillCategoriesFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};
