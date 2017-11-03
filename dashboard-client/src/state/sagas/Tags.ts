import { call, put, takeEvery } from 'redux-saga/effects'
import { TAGS_DATA_REQUEST, tagsDataFail, TagsDataRequestAction, tagsDataSuccess } from '../actions/Tags';
import ApiGetInstance from '../../api'

export function apiFetchTags() {
  const api = ApiGetInstance();

  return api.fetchAllTags();
}

export function* fetchTags(action: TagsDataRequestAction) {
  try {
    const data = yield call(apiFetchTags)
    yield put(tagsDataSuccess(data))
  } catch (error) {
    yield put(tagsDataFail(error))
  }
}

export function* watchTags() {
  yield takeEvery(TAGS_DATA_REQUEST, fetchTags)
}
