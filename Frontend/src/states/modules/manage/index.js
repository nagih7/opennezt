import { createSlice } from "@reduxjs/toolkit";

const manageSlice = createSlice({
	name: "home",
	initialState: {
		totalUsers: 0,
		roles: [],
		types: [],
		industries: [],
		paginationListRole: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListType: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListIndustry: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		isLoadingGetListRole: false,
		visibleModalCreateOrUpdateRole: false,
		isLoadingBtnCreateOrUpdateRole: false,
		visibleModalDeleteRole: false,
		isLoadingDeleteRole: false,
		isLoadingGetListType: false,
		visibleModalCreateOrUpdateType: false,
		isLoadingBtnCreateOrUpdateType: false,
		visibleModalDeleteType: false,
		isLoadingDeleteType: false,
		isLoadingGetListIndustry: false,
		visibleModalCreateOrUpdateIndustry: false,
		isLoadingBtnCreateOrUpdateIndustry: false,
		visibleModalDeleteIndustry: false,
		isLoadingDeleteIndustry: false,
	},
	reducers: {
		startRequestGetTotalUsers: (state) => ({
			...state,
		}),
		startRequestGetTotalUsersSuccess: (state, action) => ({
			...state,
			totalUsers: action.payload.data,
		}),
		startRequestGetTotalUsersFail: (state) => ({
			...state,
		}),

		// ROLES
		requestGetListRole: (state) => ({
			...state,
			isLoadingGetListRole: true,
		}),
		getListRoleSuccess: (state, action) => ({
			...state,
			isLoadingGetListRole: false,
			roles: action.payload.data.roles,
			paginationListRole: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListRoleFail: (state) => ({
			...state,
			isLoadingGetListRole: false,
		}),
		setVisibleModalCreateOrUpdateRole: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateRole: action.payload,
		}),
		setVisibleModalDeleteRole: (state, action) => ({
			...state,
			visibleModalDeleteRole: action.payload,
		}),
		requestCreateOrUpdateRole: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateRole: true,
		}),
		createOrUpdateRoleSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateRole: false,
			visibleModalCreateOrUpdateRole: false,
		}),
		createOrUpdateRoleFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateRole: false,
		}),
		requestDeleteRole: (state) => ({
			...state,
			isLoadingDeleteRole: true,
		}),
		deleteRoleSuccess: (state) => ({
			...state,
			isLoadingDeleteRole: false,
			visibleModalDeleteRole: false,
		}),
		deleteRoleFail: (state) => ({
			...state,
			isLoadingDeleteRole: false,
		}),

		// TYPES
		requestGetListType: (state) => ({
			...state,
			isLoadingGetListType: true,
		}),
		getListTypeSuccess: (state, action) => ({
			...state,
			isLoadingGetListType: false,
			types: action.payload.data.types,
			paginationListType: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListTypeFail: (state) => ({
			...state,
			isLoadingGetListType: false,
		}),
		setVisibleModalCreateOrUpdateType: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateType: action.payload,
		}),
		setVisibleModalDeleteType: (state, action) => ({
			...state,
			visibleModalDeleteType: action.payload,
		}),
		requestCreateOrUpdateType: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateType: true,
		}),
		createOrUpdateTypeSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateType: false,
			visibleModalCreateOrUpdateType: false,
		}),
		createOrUpdateTypeFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateType: false,
		}),
		requestDeleteType: (state) => ({
			...state,
			isLoadingDeleteType: true,
		}),
		deleteTypeSuccess: (state) => ({
			...state,
			isLoadingDeleteType: false,
			visibleModalDeleteType: false,
		}),
		deleteTypeFail: (state) => ({
			...state,
			isLoadingDeleteType: false,
		}),

		// INDUSTRIES
		requestGetListIndustry: (state) => ({
			...state,
			isLoadingGetListIndustry: true,
		}),
		getListIndustrySuccess: (state, action) => ({
			...state,
			isLoadingGetListIndustry: false,
			industries: action.payload.data.industries,
			paginationListIndustry: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListIndustryFail: (state) => ({
			...state,
			isLoadingGetListIndustry: false,
		}),
		setVisibleModalCreateOrUpdateIndustry: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateIndustry: action.payload,
		}),
		setVisibleModalDeleteIndustry: (state, action) => ({
			...state,
			visibleModalDeleteIndustry: action.payload,
		}),
		requestCreateOrUpdateIndustry: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateIndustry: true,
		}),
		createOrUpdateIndustrySuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateIndustry: false,
			visibleModalCreateOrUpdateIndustry: false,
		}),
		createOrUpdateIndustryFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateIndustry: false,
		}),
		requestDeleteIndustry: (state) => ({
			...state,
			isLoadingDeleteIndustry: true,
		}),
		deleteIndustrySuccess: (state) => ({
			...state,
			isLoadingDeleteIndustry: false,
			visibleModalDeleteIndustry: false,
		}),
		deleteIndustryFail: (state) => ({
			...state,
			isLoadingDeleteIndustry: false,
		}),
	},
});

export const {
	// USERS
	startRequestGetTotalUsers,
	startRequestGetTotalUsersSuccess,
	startRequestGetTotalUsersFail,
	// ROLES
	requestGetListRole,
	getListRoleSuccess,
	getListRoleFail,
	setVisibleModalCreateOrUpdateRole,
	setVisibleModalDeleteRole,
	requestCreateOrUpdateRole,
	createOrUpdateRoleSuccess,
	createOrUpdateRoleFail,
	requestDeleteRole,
	deleteRoleSuccess,
	deleteRoleFail,
	// TYPES
	requestGetListType,
	getListTypeSuccess,
	getListTypeFail,
	setVisibleModalCreateOrUpdateType,
	setVisibleModalDeleteType,
	requestCreateOrUpdateType,
	createOrUpdateTypeSuccess,
	createOrUpdateTypeFail,
	requestDeleteType,
	deleteTypeSuccess,
	deleteTypeFail,
	// INDUSTRIES
	requestGetListIndustry,
	getListIndustrySuccess,
	getListIndustryFail,
	setVisibleModalCreateOrUpdateIndustry,
	setVisibleModalDeleteIndustry,
	requestCreateOrUpdateIndustry,
	createOrUpdateIndustrySuccess,
	createOrUpdateIndustryFail,
	requestDeleteIndustry,
	deleteIndustrySuccess,
	deleteIndustryFail,
} = manageSlice.actions;

export default manageSlice.reducer;
