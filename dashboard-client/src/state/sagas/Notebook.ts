import { call, put, takeEvery } from 'redux-saga/effects'
import {
  NOTEBOOK_DATA_REQUEST,
  notebookDataFail,
  notebookDataSuccess,
  NotebookRequestAction
} from '../actions/Notebook';
// import * as Immutable from 'immutable'

// TODO: handle load requests

const demoData = {}

export function apiFetchNotebook() {
  const data = demoData
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      1000)
  })
}

export function* fetchNotebook(action: NotebookRequestAction) {
  try {
    const data = yield call(apiFetchNotebook)
    yield put(notebookDataSuccess(data))
  } catch (error) {
    yield put(notebookDataFail(error))
  }
}

export function* watchNotebook() {
  yield takeEvery(NOTEBOOK_DATA_REQUEST, fetchNotebook)
}
