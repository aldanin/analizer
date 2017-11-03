import * as Redux from 'redux'

export const LOGIN_REQUEST = 'Sessions/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'Sessions/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'Sessions/LOGIN_FAIL';

export const LOGOUT_REQUEST = 'Sessions/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'Sessions/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'Sessions/LOGOUT_FAIL';

export const SET_REDIRECT_URL = 'Sessions/SET_REDIRECT_URL';

export interface LoginRequestAction extends Redux.Action {
  username: string;
  password: string;
}

export function loginRequest(username: string, password: string): LoginRequestAction {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
  };
}

export interface LoginSuccessAction extends Redux.Action {
  userData: any;
}
export function loginSuccess(data: any): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    userData: data,
  };
}

export interface LoginFailAction extends Redux.Action {
  error: Error
}
export function loginFail(error: Error): LoginFailAction {
  return {
    type: LOGIN_FAIL,
    error,
  }
}

export function logoutRequest(): Redux.Action {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function logoutSuccess(): Redux.Action {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function logoutError(error: Error): LoginFailAction {
  return {
    type: LOGOUT_FAIL,
    error,
  };
}

export interface SetRedirectUrlAction extends Redux.Action {
  url: string;
}
export function setRedirectUrl(url: string): SetRedirectUrlAction {
  return {
    type: SET_REDIRECT_URL,
    url
  }
}
