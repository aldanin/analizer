import * as Redux from 'redux'
import Summary from './Summary'
import { initialState } from './Summary'
import { fromJS }  from 'immutable'
import { sortOptionSelected, summaryLoadFail, summaryLoadRequest, summaryLoadSuccess } from '../actions/Summary';

it('should provide the initial state', () => {
  expect(Summary(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_SUMMARY_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    error: null,
    filters: 1,
    data: [],
  })
  expect(Summary(initialState, summaryLoadRequest('1234'))).toEqual(state)
})

it('should handle LOAD_SUMMARY_SUCCESS actions', () => {
  const payload = []
  const resultState = fromJS({
    isFetching: false,
    error: null,
    filters: 1,
    data: payload,
  })

  expect(Summary(initialState, summaryLoadSuccess(payload, 123456))).toEqual(resultState)
})

it('should handle LOAD_SUMMARY_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    error: new Error('Foo bar'),
    filters: 1,
    data: [],
  })
  expect(Summary(initialState, summaryLoadFail(payload))).toEqual(resultState)
})

it('should handle SUMMARY_SORT_DATA actions', () => {
  const payload = 0;
  const resultState = fromJS({
    isFetching: true,
    error: null,
    filters: 0,
    data: [],
  })
  expect(Summary(initialState, sortOptionSelected(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    error: null,
    filters: 1,
    data: [],
  })
  expect(Summary(state, { type: 'unknown' })).toEqual(state)
})
