import * as Redux from 'redux'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SET_REDIRECT_URL,
} from '../actions/Session'

import {
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailAction,
  SetRedirectUrlAction,
} from '../actions/Session'

import { isLoggedin } from '../../helpers/SessionToken'

export type Action = LoginRequestAction | LoginSuccessAction | LoginFailAction | SetRedirectUrlAction | Redux.Action

interface State {
  isAuthenticated: boolean;
  isFetching: boolean;
  redirectUrl: string;
  error: Error | null;
}

// The initial state of the App
export const initialState: State = {
  isAuthenticated: isLoggedin(),
  isFetching: false,
  redirectUrl: '/',
  error: null,
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        error: null,
      })
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: (<LoginFailAction> action).error
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: null,
      })
    case SET_REDIRECT_URL:
      return Object.assign({}, state, {
        redirectUrl: (<SetRedirectUrlAction> action).url,
      })
    default:
      return state
  }
}

export default auth
