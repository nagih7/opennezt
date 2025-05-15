import loadAuthSaga from '../states/modules/auth/saga'
import loadHomeSaga from '../states/modules/home/saga'
import { Effect } from 'redux-saga/effects'

interface RouteSagas {
   [key: string]: () => Generator<Effect, void, any>
}

export const ROUTE_SAGAS: RouteSagas = {}

ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
