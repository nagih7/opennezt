import { createAction } from '@reduxjs/toolkit'

// Action lấy framework vai trò dự án
export const getProjectRoleFramework = createAction('project/getProjectRoleFramework')

// Action mở modal xác nhận apply
export const setOpenModalConfirmApply = createAction<boolean>('project/setOpenModalConfirmApply')
