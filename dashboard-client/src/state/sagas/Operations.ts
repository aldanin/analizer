import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_OPERATIONS_REQUEST,
  OperationsLoadAction,
  operationsLoadSuccess,
  operationsLoadFail
} from '../actions/Operations'
import ApiGetInstance from '../../api'

export function apiFetchOperations() {
  return ApiGetInstance().fetchOperations()
}

export function* fetchOperations(action: OperationsLoadAction) {
  try {
    const data = yield call(apiFetchOperations)
    yield put(operationsLoadSuccess(data))
  } catch (error) {
    yield put(operationsLoadFail(error))
  }
}

export function* watchOperations() {
  yield takeEvery(LOAD_OPERATIONS_REQUEST, fetchOperations)
}
