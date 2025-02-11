import { createSlice } from "@reduxjs/toolkit";

const manageSlice = createSlice({
	name: "home",
	initialState: {
		totalUsers: 0,
		roles: [],
		paginationListRole: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		isLoadingGetListRoles: false,
		visibleModalCreateOrUpdateRole: false,
		visibleModalDeleteRole: false,
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
			isLoadingGetListRoles: true,
		}),
		getListRoleSuccess: (state, action) => ({
			...state,
			isLoadingGetListRoles: false,
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
			isLoadingGetListRoles: false,
		}),
		setVisibleModalCreateOrUpdateRole: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateRole: action.payload,
		}),
		setVisibleModalDeleteRole: (state, action) => ({
			...state,
			visibleModalDeleteRole: action.payload,
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
} = manageSlice.actions;

export default manageSlice.reducer;
