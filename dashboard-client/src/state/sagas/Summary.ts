import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  LOAD_SUMMARY_REQUEST, SUMMARY_SORT_DATA, summaryLoadFail, SummaryLoadRequestAction,
  summaryLoadSuccess
} from '../actions/Summary';
import { PRODUCT_TYPES } from '../../types/Product'

import Api from '../../api';

export function apiFetchSummary(agentId: string) {
  const api = Api();

  return api.fetchProductsSummery({agentId});
}

export const agentIdSelector = state => state[PRODUCT_TYPES.APP].get('agentId');

export function* fetchSummary(action: SummaryLoadRequestAction) {
  try {
    let agentId = yield select(agentIdSelector);
    const data = yield call(apiFetchSummary, agentId);

    yield put(summaryLoadSuccess(data));
  } catch (error) {
    yield put(summaryLoadFail(error));
  }
}

export function* watchSummary() {
  yield takeEvery(LOAD_SUMMARY_REQUEST, fetchSummary);
  yield takeLatest(SUMMARY_SORT_DATA, fetchSummary);
}
