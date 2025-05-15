import { all, fork, Effect } from 'redux-saga/effects'
import routingSaga from '../states/modules/routing/saga'

export default function* routesSaga(): Generator<Effect, void, any> {
   yield all([fork(routingSaga)])
}
