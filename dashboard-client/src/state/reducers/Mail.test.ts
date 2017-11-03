import * as Redux from 'redux'
import mailReducer from './Mail'
import { initialState } from './Mail'
import {
  mailLoadRequest,
  mailLoadSuccess,
  mailLoadFail,
} from '../actions/Mail'
import { fromJS } from 'immutable';

it('should provide the initial state', () => {
  expect(mailReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_MAIL_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    data: null,
  })
  expect(mailReducer(initialState, mailLoadRequest('1234'))).toEqual(state)
})

it('should handle LOAD_MAIL_SUCCESS actions', () => {
  const payload = {
    accounts: [],
  }
  const resultState = fromJS({
    isFetching: false,
    lastFetchTs: 123456,
    error: null,
    data: payload,
  })

  expect(mailReducer(initialState, mailLoadSuccess(payload, 123456))).toEqual(resultState)
})

it('should handle LOAD_MAIL_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    lastFetchTs: 0,
    error: new Error('Foo bar'),
    data: null,
  })
  expect(mailReducer(initialState, mailLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    lastFetchTs: 123,
    error: null,
    data: null,
  })
  expect(mailReducer(state, { type: 'unknown' })).toEqual(state)
})
