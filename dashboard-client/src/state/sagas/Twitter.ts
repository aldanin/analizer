// TODO: handle load requests
import { TwitterData } from '../../types/SocialNetworks';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_TWITTER_REQUEST, twitterLoadFail, TwitterLoadRequestAction,
  twitterLoadSuccess } from '../actions/Twitter';
import { demoTwitterData } from '../../mockData/Twitter';

const demoData: TwitterData = demoTwitterData;

export function apiFetchTwitter() {
  const data = demoData
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      500)
  })
}

export function* fetchTwitter(action: TwitterLoadRequestAction) {
  try {
    const data = yield call(apiFetchTwitter)
    yield put(twitterLoadSuccess(data))
  } catch (error) {
    yield put(twitterLoadFail(error))
  }
}

export function* watchTwitter() {
  yield takeEvery(LOAD_TWITTER_REQUEST, fetchTwitter);
}
