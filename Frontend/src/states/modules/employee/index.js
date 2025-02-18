import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
	name: "employee",
	initialState: {
		employees: [],
		isLoadingTableEmployee: false,
		paginationListEmployee: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		allRole: [],
		visibleModalCreateOrUpdateEmployee: false,
		isLoadingBtnCreateOrUpdateEmployee: false,
		errorCreateOrUpdateEmployee: {
			name: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		},
		visibleModalDeleteEmployee: false,
		isLoadingBtnDeleteEmployee: false,
	},
	reducers: {
		setErrorCreateOrUpdateEmployee: (state, action) => ({
			...state,
			errorCreateOrUpdateEmployee: action.payload,
		}),
		setVisibleModalCreateOrUpdateEmployee: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateEmployee: action.payload,
		}),
		setVisibleModalDeleteEmployee: (state, action) => ({
			...state,
			visibleModalDeleteEmployee: action.payload,
		}),
		getList: (state) => ({
			...state,
			employees: [],
			isLoadingTableEmployee: true,
		}),
		getListSuccess: (state, action) => ({
			...state,
			isLoadingTableEmployee: false,
			employees: action.payload.data.users,
			paginationListEmployee: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListFail: (state) => ({
			...state,
			employees: [],
			isLoadingTableEmployee: false,
		}),
		getAllRole: (state) => ({ ...state }),
		getAllRoleSuccess: (state, action) => ({
			...state,
			allRole: action.payload.data,
		}),
		getAllRoleFail: (state) => ({ ...state }),
		createEmployee: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateEmployee: true,
		}),
		createEmployeeSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateEmployee: false,
		}),
		createEmployeeFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateEmployee: false,
		}),
		updateEmployee: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateEmployee: true,
		}),
		updateEmployeeSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateEmployee: false,
		}),
		updateEmployeeFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateEmployee: false,
		}),
		deleteEmployee: (state) => ({
			...state,
			isLoadingBtnDeleteEmployee: true,
		}),
		deleteEmployeeSuccess: (state) => ({
			...state,
			isLoadingBtnDeleteEmployee: false,
			visibleModalDeleteEmployee: false,
		}),
		deleteEmployeeFail: (state) => ({
			...state,
			isLoadingBtnDeleteEmployee: false,
		}),
	},
});

export const {
	setErrorCreateOrUpdateEmployee,
	setVisibleModalDeleteEmployee,
	setVisibleModalCreateOrUpdateEmployee,
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
} = employeeSlice.actions;

export default employeeSlice.reducer;
