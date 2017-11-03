import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  LOAD_INITIAL_SCREENSHOTS,
  LOAD_SCREENSHOTS,
  SET_SCREENSHOTS_FILTERS,
  ScreenshotsLoadAction,
  ScreenshotsSetFiltersAction,
  ScreenshotsLoadInitialAction,

  screenshotsLoadRequest,
  screenshotsLoadSuccess,
  screenshotsLoadFail,
} from '../actions/Screenshots'
import { ScreenshotId } from '../../types/Screenshot'
import { Filters } from '../../types/GenericFilters'

import { getScreenshotsBatch, MAX_ID } from '../../mockData/Screenshot'

export function apiFetchScreenshots(anchorId: ScreenshotId, count: number, isOlder: boolean, filters: Filters) {
  const res = {
    data: getScreenshotsBatch(anchorId, count, isOlder),
    totalNewestId: MAX_ID,
    totalOldestId: 0,
  }
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(res) },
      500)
  })
}

export function apiFetchLatestScreenshots(count: number, filters: Filters) {
  const res = {
    data: getScreenshotsBatch(MAX_ID, count, true),
    totalNewestId: MAX_ID,
    totalOldestId: 0,
  }
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(res) },
      500)
  })
}

export const filterSelector = state => state.screenshots.filters
export const idsSelector = state => ({
  oldestId: state.screenshots.oldestId,
  newestId: state.screenshots.newestId,
})

export function* fetchScreenshots(action: ScreenshotsLoadAction) {
  try {
    const {count, isOlder} = action
    const ids = yield select(idsSelector)
    const anchorId = isOlder ? ids.oldestId : ids.newestId
    const filters = yield select(filterSelector)
    yield put(screenshotsLoadRequest(anchorId, count, isOlder))
    const {data, totalOldestId, totalNewestId} =
      yield call(apiFetchScreenshots, anchorId, count, isOlder, filters)
    yield put(screenshotsLoadSuccess(data, totalOldestId, totalNewestId, isOlder))
  } catch (error) {
    yield put(screenshotsLoadFail(error))
  }
}

export function* fetchLatestScreenshots(action: ScreenshotsLoadInitialAction | ScreenshotsSetFiltersAction) {
  try {
    const {count} = action
    const filters = yield select(filterSelector)
    yield put(screenshotsLoadRequest(-1, count, true))
    const {data, totalOldestId, totalNewestId} =
      yield call(apiFetchLatestScreenshots, count, filters)
    yield put(screenshotsLoadSuccess(data, totalOldestId, totalNewestId, true))
  } catch (error) {
    yield put(screenshotsLoadFail(error))
  }
}

export function* watchScreenshots() {
  yield takeEvery(LOAD_SCREENSHOTS, fetchScreenshots)
  yield takeEvery([LOAD_INITIAL_SCREENSHOTS, SET_SCREENSHOTS_FILTERS], fetchLatestScreenshots)
}
