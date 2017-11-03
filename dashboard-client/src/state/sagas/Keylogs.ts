import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  LOAD_KEYLOGS,
  SET_KEYLOGS_FILTERS,
  KeylogsLoadAction,
  keylogsLoadRequest,
  keylogsLoadSuccess,
  keylogsLoadFail,
  KeylogsSetFiltersAction,
} from '../actions/Keylogs'
import { PRODUCT_TYPES } from '../../types/Product'

import { getKeystrokes } from '../../mockData/Keylogger'
import { Filters } from '../../types/GenericFilters'

export function apiFetchKeylogs(count: number, filters: Filters) {
  const data = Array.from({length: count}, (v, i) => getKeystrokes(i * 3000, 2000))
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      500)
  })
}

export const filterSelector = state => state[PRODUCT_TYPES.KEYLOG].filters

export function* fetchKeylogs(action: KeylogsLoadAction | KeylogsSetFiltersAction) {
  try {
    const {count} = action
    const filters = yield select(filterSelector)
    yield put(keylogsLoadRequest())
    const data = yield call(apiFetchKeylogs, count, filters)
    yield put(keylogsLoadSuccess(data))
  } catch (error) {
    yield put(keylogsLoadFail(error))
  }
}

export function* watchKeylogs() {
  yield takeEvery([LOAD_KEYLOGS, SET_KEYLOGS_FILTERS], fetchKeylogs)
}
