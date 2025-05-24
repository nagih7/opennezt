import { all, fork, put, takeLatest, call, Effect } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { setTitlePage } from '../app'
import { getListEmployee } from '../../../api/employee'
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
} from './index'
import _ from 'lodash'

// Define error interface
interface ErrorPayload {
   status: number
   data: {
      errors: {
         name?: string
         email?: string
         phone?: string
         password?: string
      }
   }
}

function* loadRouteData(): Generator<Effect, void, any> {
   yield put(setTitlePage('User Management'))
   // yield put(getListEmployee());
   // yield put(getAllRoleForEmployee())
}

function* handleActions(): Generator<Effect, void, any> {
   yield takeLatest(createEmployeeSuccess.type, function* (): Generator<Effect, void, any> {
      yield put(setVisibleModalCreateOrUpdateEmployee(false))
      // yield put(getListEmployee());
   })

   yield takeLatest(createEmployeeFail.type, function* (action: PayloadAction<ErrorPayload>): Generator<
      Effect,
      void,
      any
   > {
      const status = action.payload.status
      if (status === 400) {
         const errors = action.payload.data.errors
         yield put(
            setErrorCreateOrUpdateEmployee({
               name: _.get(errors, 'name', ''),
               email: _.get(errors, 'email', ''),
               phone: _.get(errors, 'phone', ''),
               password: _.get(errors, 'password', ''),
            })
         )
      }
   })

   yield takeLatest(updateEmployeeSuccess.type, function* (): Generator<Effect, void, any> {
      yield put(setVisibleModalCreateOrUpdateEmployee(false))
      yield put(getListEmployee())
   })

   yield takeLatest(updateEmployeeFail.type, function* (action: PayloadAction<ErrorPayload>): Generator<
      Effect,
      void,
      any
   > {
      const status = action.payload.status
      if (status === 400) {
         const errors = action.payload.data.errors
         yield put(
            setErrorCreateOrUpdateEmployee({
               name: _.get(errors, 'name', ''),
               email: _.get(errors, 'email', ''),
               phone: _.get(errors, 'phone', ''),
            })
         )
      }
   })

   yield takeLatest(deleteEmployeeSuccess.type, function* (): Generator<Effect, void, any> {
      yield put(setVisibleModalDeleteEmployee(false))
      yield put(getListEmployee())
   })

   yield takeLatest(deleteEmployeeFail.type, function* (): Generator<Effect, void, any> {
      yield put(setVisibleModalDeleteEmployee(false))
   })
}

export default function* loadEmployeeSaga(): Generator<Effect, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
