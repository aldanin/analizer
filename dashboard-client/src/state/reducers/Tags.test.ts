import * as Redux from 'redux'
import tagReducer from './Tags'
import { initialState } from './Tags'
import {
  tagsDataRequest,
  tagsDataSuccess,
  tagsDataFail,
} from '../actions/Tags'
import { TagData } from '../../types/Tag';
import { fromJS } from 'immutable';

it('should provide the initial state', () => {
  expect(tagReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle TAGS_DATA_REQUEST actions', () => {
  const state  = fromJS({
    isFetching: true,
    error: null,
    data: [],
  })
  expect(tagReducer(initialState, tagsDataRequest())).toEqual(state)
})

it('should handle TAGS_DATA_SUCCESS actions', () => {
  const payload = ['Home'] as TagData[]

  const resultState = fromJS({
    isFetching: false,
    error: null,
    data: payload,
  })

  expect(tagReducer(initialState, tagsDataSuccess(payload))).toEqual(resultState)
})

it('should handle TAGS_DATA_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    error: payload,
    data: [],
  })
  expect(tagReducer(initialState, tagsDataFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    error: null,
    data: [],
  })
  expect(tagReducer(state, { type: 'unknown' })).toEqual(state)
})
