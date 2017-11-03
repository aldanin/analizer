import * as Redux from 'redux';
import globalLoadingReducer from './GlobalLoading'
import { initialState } from './GlobalLoading'
import {
  agentsLoad,
  agentsLoadSuccess,
  agentsLoadFail
} from '../actions/Agents'

it('should provide the initial state', () => {
  expect(globalLoadingReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle REQUEST actions', () => {
  expect(globalLoadingReducer(initialState, agentsLoad())).toEqual({
    count: 1
  })
})

it('should handle SUCCESS / FAILURE actions', () => {
  const state = {
    count: 1
  }
  expect(globalLoadingReducer(state, agentsLoadSuccess([]))).toEqual({
    count: 0
  })
  expect(globalLoadingReducer(state, agentsLoadFail(new Error()))).toEqual({
    count: 0
  })
})

it('should ignore unknown actions', () => {
  const state = {
    count: 1
  }
  expect(globalLoadingReducer(state, { type: 'unknown' })).toEqual(state)
})
