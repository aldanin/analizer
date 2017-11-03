import * as Redux from 'redux'
import userReducer from './User'
import { initialState } from './User'
import {
  userDataRequest,
  userDataSuccess,
  userDataFail,
} from '../actions/User'
import { UserData } from '../../types/Users'

it('should provide the initial state', () => {
  expect(userReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle USER_DATA_REQUEST actions', () => {
  const state = {
    isFetching: true,
    error: null,
    data: null,
  }
  expect(userReducer(initialState, userDataRequest('1234'))).toEqual(state)
})

it('should handle USER_DATA_SUCCESS actions', () => {
  const payload = {
    name: 'bob',
    id: '1234',
  } as UserData

  const resultState = {
    isFetching: false,
    error: null,
    data: payload,
  }
  expect(userReducer(initialState, userDataSuccess(payload))).toEqual(resultState)
})

it('should handle USER_DATA_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    error: payload,
    data: null,
  }
  expect(userReducer(initialState, userDataFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = {
    isFetching: false,
    error: null,
    data: null,
  }
  expect(userReducer(state, { type: 'unknown' })).toEqual(state)
})
