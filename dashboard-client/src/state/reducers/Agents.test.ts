import * as Redux from 'redux'
import agentsReducer from './Agents'
import { initialState } from './Agents'
import {
  agentsLoad,
  agentsLoadSuccess,
  agentsLoadFail,
} from '../actions/Agents'

import { AgentData } from '../../types/Agent'

it('should provide the initial state', () => {
  expect(agentsReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_AGENTS_REQUEST actions', () => {
  const state = {
    isFetching: true,
    error: null,
    data: [] as AgentData[],
  }
  expect(agentsReducer(initialState, agentsLoad())).toEqual(state)
})

it('should handle LOAD_AGENTS_SUCCESS actions', () => {
  const payload = []
  const resultState = {
    isFetching: false,
    error: null,
    data: payload,
  }

  expect(agentsReducer(initialState, agentsLoadSuccess(payload))).toEqual(resultState)
})

it('should handle LOAD_AGENTS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    error: new Error('Foo bar'),
    data: [],
  }
  expect(agentsReducer(initialState, agentsLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = {
    isFetching: false,
    error: null,
    data: [],
  }
  expect(agentsReducer(state, { type: 'unknown' })).toEqual(state)
})
