import { all, fork, put, takeLatest, call, Effect } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { setTitlePage } from '../app'
import { getAllRoleForEmployee, getListEmployee } from '../../../api/employee'
import {
   setErrorCreateOrUpdateEmployee,
   setVisibleModalCreateOrUpdateEmployee,
   setVisibleModalDeleteEmployee,
   createEmployeeFail,
   createEmployeeSuccess,
   updateEmployeeFail,
   updateEmployeeSuccess,
   deleteEmployeeFail,
   deleteEmployeeSuccess,
   requestGetAllRoleForEmployee,
   getAllRoleForEmployeeSuccess,
   getAllRoleForEmployeeFail,
   requestGetListUser,
   getListUserSuccess,
   getListUserFail,
   requestCreateEmployee,
   requestUpdateEmployee,
   requestDeleteEmployee,
} from './index'
import { getNotification } from '../../../utils/helper'

function* loadRouteData(): Generator<Effect, void, any> {
   yield put(setTitlePage('Employee'))
   try {
      yield all([yield put(requestGetListUser()), yield put(requestGetAllRoleForEmployee())])
   } catch (error) {
      console.error(error)
   }
}

function* handleGetListEmployee(action: PayloadAction<any>): Generator<Effect, void, any> {
   try {
      const res = yield call(getListEmployee, action.payload)
      if (res.status) {
         yield put(getListUserSuccess(res))
      } else {
         yield put(getListUserFail())
      }
   } catch (error) {
      yield put(getListUserFail())
      console.error(error)
   }
}

function* handleGetAllRoleForEmployee(): Generator<Effect, void, any> {
   try {
      const res = yield call(getAllRoleForEmployee)
      if (res.status) {
         yield put(getAllRoleForEmployeeSuccess(res))
      } else {
         yield put(getAllRoleForEmployeeFail())
      }
   } catch (error) {
      yield put(getAllRoleForEmployeeFail())
      console.error(error)
   }
}

function* handleActions(): Generator<Effect, void, any> {
   yield takeLatest(requestGetListUser, handleGetListEmployee)
   yield takeLatest(requestGetAllRoleForEmployee, handleGetAllRoleForEmployee)
   // Add other action handlers here
}

export default function* employeeSaga(): Generator<Effect, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
