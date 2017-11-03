import * as Redux from 'redux'
import targetsReducer from './Targets'
import { initialState } from './Targets'
import {
  targetsLoadRequest,
  targetsLoadSuccess,
  targetsLoadFail,
} from '../actions/Targets'

import { TargetData } from '../../types/Target'

it('should provide the initial state', () => {
  expect(targetsReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_TARGETS_REQUEST actions', () => {
  const state = {
    isFetching: true,
    error: null,
    data: [] as TargetData[],
  }
  expect(targetsReducer(initialState, targetsLoadRequest())).toEqual(state)
})

it('should handle LOAD_TARGETS_SUCCESS actions', () => {
  const payload = []
  const resultState = {
    isFetching: false,
    error: null,
    data: payload,
  }

  expect(targetsReducer(initialState, targetsLoadSuccess(payload))).toEqual(resultState)
})

it('should handle LOAD_TARGETS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    error: new Error('Foo bar'),
    data: [],
  }
  expect(targetsReducer(initialState, targetsLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = {
    isFetching: false,
    error: null,
    data: [],
  }
  expect(targetsReducer(state, { type: 'unknown' })).toEqual(state)
})
