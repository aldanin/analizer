import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_TARGETS_REQUEST,
  TargetsLoadRequestAction,
  targetsLoadSuccess,
  targetsLoadFail
} from '../actions/Targets'
import ApiGetInstance from '../../api'

export function apiFetchTargets() {
  return ApiGetInstance().fetchTargets()
}

export function* fetchTargets(action: TargetsLoadRequestAction) {
  try {
    const data = yield call(apiFetchTargets)
    yield put(targetsLoadSuccess(data))
  } catch (error) {
    yield put(targetsLoadFail(error))
  }
}

export function* watchTargets() {
  yield takeEvery(LOAD_TARGETS_REQUEST, fetchTargets)
}
