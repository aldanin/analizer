import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_STORIES,
  StoriesLoadAction,
  storiesLoadRequest,
  storiesLoadSuccess,
  storiesLoadFail
} from '../actions/Stories'

import { getStoryData } from '../../mockData/Story'

export function apiFetchStories(count: number) {
  const data = Array.from({length: count}, () => getStoryData())

  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      500)
  })
}

export function* fetchStories(action: StoriesLoadAction) {
  try {
    const {count} = action
    yield put(storiesLoadRequest())
    const data = yield call(apiFetchStories, count)
    yield put(storiesLoadSuccess(data))
  } catch (error) {
    yield put(storiesLoadFail(error))
  }
}

export function* watchStories() {
  yield takeEvery(LOAD_STORIES, fetchStories)
}
