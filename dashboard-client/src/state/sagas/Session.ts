import { take, put, call } from 'redux-saga/effects'
import * as SessionHelpers from '../../helpers/SessionToken'

import Api from '../../api';

import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFail,
  LOGOUT_REQUEST,
  logoutSuccess,
} from '../actions/Session'

// Authenticate, exchanging credentials for session data
export function apiAuth(username: string, password: string) {
  let api = Api();

  return api.doLogin(username, password).then((sessionData) => sessionData);
}

export function* authorize(username: string, password: string) {
  try {
    const sessionData = yield call(apiAuth, username, password);

    const sessionToken = sessionData.sessionToken;
    yield put(loginSuccess(sessionToken));

    // sync
    SessionHelpers.setSessionData(sessionToken);
    SessionHelpers.setSessionData(JSON.stringify(sessionData.userInfo), 'userInfo');

    return sessionData;
  } catch (error) {
    yield put(loginFail(error))
  }
}

export function* deauthorize() {
  try {
    // sync
    SessionHelpers.clearSessionData();
    SessionHelpers.clearSessionData('userInfo');

  } catch (error) {
    yield put(loginFail(error))
  }
}

export function* loginFlow() {
  while (true) {
    const {username, password} = yield take(LOGIN_REQUEST);

    yield call(authorize, username, password);
  }
}

// We need this too, as user might be initially logged-in
export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT_REQUEST);

    yield deauthorize();

    yield put(logoutSuccess());

    // sync
    sessionStorage.removeItem('userData');
  }
}
