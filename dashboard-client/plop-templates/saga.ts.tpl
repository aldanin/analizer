import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_{{ constantCase name }},
  {{ properCase name }}LoadAction,
  {{ camelCase name }}LoadRequest,
  {{ camelCase name }}LoadSuccess,
  {{ camelCase name }}LoadFail
} from '../actions/{{ properCase name }}'

// TODO: handle load requests
const demoData = []

export function apiFetch{{ properCase name }}(count: number) {
  const data = demoData
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      500)
  })
}

export function* fetch{{ properCase name }}(action: {{ properCase name }}LoadAction) {
  try {
    const {count} = action
    yield put({{ camelCase name }}LoadRequest())
    const data = yield call(apiFetch{{ properCase name }}, count)
    yield put({{ camelCase name }}LoadSuccess(data))
  } catch (error) {
    yield put({{ camelCase name }}LoadFail(error))
  }
}

export function* watch{{ properCase name }}() {
  yield takeEvery(LOAD_{{ constantCase name }}, fetch{{ properCase name }})
}
