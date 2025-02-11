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
		visibleModalDeleteRole: false,
		isLoadingGetListType: false,
		visibleModalCreateOrUpdateType: false,
		visibleModalDeleteType: false,
		isLoadingGetListIndustry: false,
		visibleModalCreateOrUpdateIndustry: false,
		visibleModalDeleteIndustry: false,
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
	},
});

export const {
	startRequestGetTotalUsers,
	startRequestGetTotalUsersSuccess,
	startRequestGetTotalUsersFail,
	requestGetListRole,
	getListRoleSuccess,
	getListRoleFail,
	setVisibleModalCreateOrUpdateRole,
	setVisibleModalDeleteRole,
	requestGetListType,
	getListTypeSuccess,
	getListTypeFail,
	setVisibleModalCreateOrUpdateType,
	setVisibleModalDeleteType,
	requestGetListIndustry,
	getListIndustrySuccess,
	getListIndustryFail,
	setVisibleModalCreateOrUpdateIndustry,
	setVisibleModalDeleteIndustry,
} = manageSlice.actions;

export default manageSlice.reducer;
