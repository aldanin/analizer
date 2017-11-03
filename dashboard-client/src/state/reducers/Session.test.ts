import sessionReducer from './Session'
import { initialState, Action } from './Session'
import {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutSuccess,
  setRedirectUrl,
} from '../actions/Session'

it('should provide the initial state', () => {
  expect(sessionReducer(undefined, {} as Action)).toEqual(initialState)
})

it('should handle LOGIN_REQUEST actions', () => {
  const state = {
    isAuthenticated: false,
    isFetching: true,
    redirectUrl: '/',
    error: null,
  }
  expect(sessionReducer(initialState, loginRequest('foo', 'bar'))).toEqual(state)
})

it('should handle LOGIN_SUCCESS actions', () => {
  const state = {
    isAuthenticated: true,
    isFetching: false,
    redirectUrl: '/',
    error: null,
  }

  expect(sessionReducer(initialState, loginSuccess({id_token: '12345sadfa'}))).toEqual(state)
})

it('should handle LOGIN_FAIL actions', () => {
  const payload = new Error('Errorrrrr!')

  const state = {
    isAuthenticated: false,
    isFetching: false,
    redirectUrl: '/',
    error: payload,
  }
  expect(sessionReducer(initialState, loginFail(payload))).toEqual(state)
})

it('should handle LOGOUT_SUCCESS actions', () => {
  const state = {
    isAuthenticated: false,
    isFetching: false,
    redirectUrl: '/',
    error: null,
  }
  expect(sessionReducer(initialState, logoutSuccess())).toEqual(state)
})

it('should handle SET_REDIRECT_URL actions', () => {
  const payload = '/foo/bar/baz'
  const state = {
    isAuthenticated: false,
    isFetching: false,
    redirectUrl: payload,
    error: null,
  }
  expect(sessionReducer(initialState, setRedirectUrl(payload))).toEqual(state)
})

it('should ignore unknown actions', () => {
  const state = {
    isAuthenticated: true,
    isFetching: false,
    redirectUrl: '/foo/bar/',
    error: null,
  }
  expect(sessionReducer(state, { type: 'unknown' })).toEqual(state)
})
