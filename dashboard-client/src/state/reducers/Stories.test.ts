import * as Redux from 'redux'
import storiesReducer from './Stories'
import { initialState } from './Stories'
import {
  storiesLoadRequest,
  storiesLoadSuccess,
  storiesLoadFail,
} from '../actions/Stories'

import { StoryData } from '../../types/Story'

it('should provide the initial state', () => {
  expect(storiesReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_STORIES_REQUEST actions', () => {
  const state = {
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    data: [] as StoryData[],
  }
  expect(storiesReducer(initialState, storiesLoadRequest())).toEqual(state)
})

it('should handle LOAD_STORIES_SUCCESS actions', () => {
  const payload = []
  const resultState = {
    isFetching: false,
    lastFetchTs: 123456,
    error: null,
    data: payload,
  }

  expect(storiesReducer(initialState, storiesLoadSuccess(payload, 123456))).toEqual(resultState)
})

it('should handle LOAD_STORIES_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    lastFetchTs: 0,
    error: new Error('Foo bar'),
    data: [],
  }
  expect(storiesReducer(initialState, storiesLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = {
    isFetching: false,
    lastFetchTs: 123,
    error: null,
    data: [],
  }
  expect(storiesReducer(state, { type: 'unknown' })).toEqual(state)
})
