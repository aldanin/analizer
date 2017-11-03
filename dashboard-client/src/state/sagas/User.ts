import { call, put, takeEvery, cancelled } from 'redux-saga/effects'
import { USER_DATA_REQUEST, UserDataRequestAction, userDataSuccess, userDataFail } from '../actions/User'

// Call API to get user details
export function apiGetUserData(id: string) {
  // TODO: fetch from API endpoint, using token
  const userInfo = sessionStorage.getItem('userInfo');
  if (userInfo) {
    return Promise.resolve(JSON.parse(userInfo))
  }
  throw new Error('User info not found');
}

// Retrieve user data (name, photo, etc.)
export function* fetchUserData(action: UserDataRequestAction) {
  try {
    const userData = yield call(apiGetUserData, action.userId);
    yield put(userDataSuccess(userData))
  } catch (error) {
    yield put(userDataFail(error))
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* watchUser() {
  yield takeEvery(USER_DATA_REQUEST, fetchUserData)
}
