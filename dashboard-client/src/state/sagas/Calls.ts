import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../actions/Calls'
import * as Calls from '../../types/Calls'

import * as Mock from '../../components/CallsAppViewer/mockData/Data'

export function promisedGetData(nextPageNumber: number, pageSize: number, filters: Calls.Filters) {
  const data = Mock.getData(nextPageNumber, pageSize, filters);

  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(data)
      },
      100)
  })
}

export function* fetchCallsData(action: Actions.CallsLoadRequestAction) {

  const {nextPageNumber, pageSize, filters} = action;
  const result = yield call(promisedGetData, nextPageNumber, pageSize, filters);
  yield put(Actions.callsLoadSuccess(result.callsData, result.nextPageNumber, result.totalCount));
}

export function* watchCalls() {
  yield takeLatest(Actions.CALLS_LOAD_REQUEST, fetchCallsData)
}
