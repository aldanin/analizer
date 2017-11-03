import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_SOCIAL_NETWORKS_REQUEST,
  SocialNetworksLoadRequestAction,
  socialNetworksLoadSuccess,
  socialNetworksLoadFail,
} from '../actions/SocialNetworks'

const demoData = 1234567;

export function apiFetchSocialNetworks() {
  const data = demoData;
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      500)
  })
}

export function* fetchSocialNetworks(action: SocialNetworksLoadRequestAction) {
  try {
    const timestamp = yield call(apiFetchSocialNetworks)
    yield put(socialNetworksLoadSuccess(timestamp))
  } catch (error) {
    yield put(socialNetworksLoadFail(error))
  }
}

export function* watchSocialNetworks() {
  yield takeEvery(LOAD_SOCIAL_NETWORKS_REQUEST, fetchSocialNetworks);
}
