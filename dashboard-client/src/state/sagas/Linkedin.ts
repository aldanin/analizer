// TODO: handle load requests
import { LinkedinData } from '../../types/SocialNetworks';
import {
  LINKEDIN_SORT_BY, linkedinLoadFail, LinkedinLoadRequestAction, linkedinLoadSuccess,
  LOAD_LINKEDIN_REQUEST
} from '../actions/Linkedin';
import { call, put, takeEvery } from 'redux-saga/effects';
import { demoLinkedinData } from '../../mockData/Linkedin';

const demoData: LinkedinData = demoLinkedinData;

export function apiFetchLinkedin() {
  const data = demoData
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      500)
  })
}

export function* fetchLinkedin(action: LinkedinLoadRequestAction) {
  try {
    const data = yield call(apiFetchLinkedin)
    yield put(linkedinLoadSuccess(data))
  } catch (error) {
    yield put(linkedinLoadFail(error))
  }
}

export function* watchLinkedin() {
  yield takeEvery(LOAD_LINKEDIN_REQUEST, fetchLinkedin);
  yield takeEvery(LINKEDIN_SORT_BY, fetchLinkedin);
}
