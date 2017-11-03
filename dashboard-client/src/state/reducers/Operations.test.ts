import * as Redux from 'redux'
import operationsReducer from './Operations'
import { initialState } from './Operations'
import {
  operationsLoad,
  operationsLoadSuccess,
  operationsLoadFail,
} from '../actions/Operations'

import { OperationData } from '../../types/Operation'

it('should provide the initial state', () => {
  expect(operationsReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_OPERATIONS_REQUEST actions', () => {
  const state = {
    isFetching: true,
    error: null,
    data: [] as OperationData[],
  }
  expect(operationsReducer(initialState, operationsLoad())).toEqual(state)
})

it('should handle LOAD_OPERATIONS_SUCCESS actions', () => {
  const payload = []
  const resultState = {
    isFetching: false,
    error: null,
    data: payload,
  }

  expect(operationsReducer(initialState, operationsLoadSuccess(payload))).toEqual(resultState)
})

it('should handle LOAD_OPERATIONS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    error: new Error('Foo bar'),
    data: [],
  }
  expect(operationsReducer(initialState, operationsLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = {
    isFetching: false,
    error: null,
    data: [],
  }
  expect(operationsReducer(state, { type: 'unknown' })).toEqual(state)
})
