import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeState, EmployeeErrorState } from './types'

// Define the initial state with TypeScript typing
const initialState: EmployeeState = {
   users: [],
   isLoadingGetListUser: false,
   paginationListUser: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   allRole: [],
   visibleModalCreateOrUpdateEmployee: false,
   isLoadingBtnCreateOrUpdateEmployee: false,
   errorCreateOrUpdateEmployee: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
   },
   visibleModalDeleteEmployee: false,
   isLoadingBtnDeleteEmployee: false,
}

const employeeSlice = createSlice({
   name: 'employee',
   initialState,
   reducers: {
      setErrorCreateOrUpdateEmployee: (state: EmployeeState, action: PayloadAction<EmployeeErrorState>) => ({
         ...state,
         errorCreateOrUpdateEmployee: action.payload,
      }),
      setVisibleModalCreateOrUpdateEmployee: (state: EmployeeState, action: PayloadAction<boolean>) => ({
         ...state,
         visibleModalCreateOrUpdateEmployee: action.payload,
         errorCreateOrUpdateEmployee: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
         },
      }),
      requestGetListUser: (state: EmployeeState) => ({
         ...state,
         isLoadingGetListUser: true,
      }),
      getListUserSuccess: (state: EmployeeState, action: PayloadAction<any>) => ({
         ...state,
         users: action.payload.data.users,
         paginationListUser: {
            currentPage: action.payload.data.page,
            perPage: action.payload.data.per_page,
            totalPage: action.payload.data.total_page,
            totalRecord: action.payload.data.total,
         },
         isLoadingGetListUser: false,
      }),
      getListUserFail: (state: EmployeeState) => ({
         ...state,
         isLoadingGetListUser: false,
      }),
      requestGetAllRoleForEmployee: (state: EmployeeState) => ({
         ...state,
      }),
      getAllRoleForEmployeeSuccess: (state: EmployeeState, action: PayloadAction<any>) => ({
         ...state,
         allRole: action.payload.data,
      }),
      getAllRoleForEmployeeFail: (state: EmployeeState) => ({
         ...state,
      }),
      requestCreateEmployee: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnCreateOrUpdateEmployee: true,
      }),
      createEmployeeSuccess: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnCreateOrUpdateEmployee: false,
         visibleModalCreateOrUpdateEmployee: false,
      }),
      createEmployeeFail: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnCreateOrUpdateEmployee: false,
      }),
      requestUpdateEmployee: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnCreateOrUpdateEmployee: true,
      }),
      updateEmployeeSuccess: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnCreateOrUpdateEmployee: false,
         visibleModalCreateOrUpdateEmployee: false,
      }),
      updateEmployeeFail: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnCreateOrUpdateEmployee: false,
      }),
      setVisibleModalDeleteEmployee: (state: EmployeeState, action: PayloadAction<boolean>) => ({
         ...state,
         visibleModalDeleteEmployee: action.payload,
      }),
      requestDeleteEmployee: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnDeleteEmployee: true,
      }),
      deleteEmployeeSuccess: (state: EmployeeState) => ({
         ...state,
         visibleModalDeleteEmployee: false,
         isLoadingBtnDeleteEmployee: false,
      }),
      deleteEmployeeFail: (state: EmployeeState) => ({
         ...state,
         isLoadingBtnDeleteEmployee: false,
      }),
   },
})

export const {
   setErrorCreateOrUpdateEmployee,
   setVisibleModalCreateOrUpdateEmployee,
   requestGetListUser,
   getListUserSuccess,
   getListUserFail,
   requestGetAllRoleForEmployee,
   getAllRoleForEmployeeSuccess,
   getAllRoleForEmployeeFail,
   requestCreateEmployee,
   createEmployeeSuccess,
   createEmployeeFail,
   requestUpdateEmployee,
   updateEmployeeSuccess,
   updateEmployeeFail,
   setVisibleModalDeleteEmployee,
   requestDeleteEmployee,
   deleteEmployeeSuccess,
   deleteEmployeeFail,
} = employeeSlice.actions

export default employeeSlice.reducer
