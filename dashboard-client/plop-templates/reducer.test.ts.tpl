import * as Redux from 'redux'
import {{ camelCase name }}Reducer from './{{ properCase name }}'
import { initialState } from './{{ properCase name }}'
import {
  {{ camelCase name }}LoadRequest,
  {{ camelCase name }}LoadSuccess,
  {{ camelCase name }}LoadFail,
} from '../actions/{{ properCase name }}'

import { {{ typeName }}Data } from '../../types/{{ typeName }}'

it('should provide the initial state', () => {
  expect({{ camelCase name }}Reducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_{{ constantCase name }}_REQUEST actions', () => {
  const state = {
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    data: [] as {{ typeName }}Data[],
  }
  expect({{ camelCase name }}Reducer(initialState, {{ camelCase name }}LoadRequest())).toEqual(state)
})

it('should handle LOAD_{{ constantCase name }}_SUCCESS actions', () => {
  const payload = []
  const resultState = {
    isFetching: false,
    lastFetchTs: 123456,
    error: null,
    data: payload,
  }

  expect({{ camelCase name }}Reducer(initialState, {{ camelCase name }}LoadSuccess(payload, 123456))).toEqual(resultState)
})

it('should handle LOAD_{{ constantCase name }}_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    lastFetchTs: 0,
    error: new Error('Foo bar'),
    data: [],
  }
  expect({{ camelCase name }}Reducer(initialState, {{ camelCase name }}LoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = {
    isFetching: false,
    lastFetchTs: 123,
    error: null,
    data: [],
  }
  expect({{ camelCase name }}Reducer(state, { type: 'unknown' })).toEqual(state)
})
