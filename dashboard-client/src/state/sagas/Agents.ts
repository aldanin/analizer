import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_AGENTS_REQUEST,
  AgentsLoadAction,
  agentsLoadSuccess,
  agentsLoadFail
} from '../actions/Agents'
import ApiGetInstance from '../../api'

export function apiFetchAgents() {
  return ApiGetInstance().fetchAgents()
}

export function* fetchAgents(action: AgentsLoadAction) {
  try {
    const data = yield call(apiFetchAgents)
    yield put(agentsLoadSuccess(data))
  } catch (error) {
    yield put(agentsLoadFail(error))
  }
}

export function* watchAgents() {
  yield takeEvery(LOAD_AGENTS_REQUEST, fetchAgents)
}
