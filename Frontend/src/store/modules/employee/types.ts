export interface PaginationState {
   currentPage: number
   perPage: number
   totalPage: number
   totalRecord: number
}

export interface EmployeeErrorState {
   name: string
   email: string
   phone: string
   password: string
   confirmPassword: string
}

export interface EmployeeState {
   users: any[]
   isLoadingGetListUser: boolean
   paginationListUser: PaginationState
   allRole: any[]
   visibleModalCreateOrUpdateEmployee: boolean
   isLoadingBtnCreateOrUpdateEmployee: boolean
   errorCreateOrUpdateEmployee: EmployeeErrorState
   visibleModalDeleteEmployee: boolean
   isLoadingBtnDeleteEmployee: boolean
}
