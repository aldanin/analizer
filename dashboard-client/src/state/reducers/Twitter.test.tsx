import * as Redux from 'redux'
import twitter from './Twitter'
import { initialState } from './Twitter'
import {
  twitterLoadRequest,
  twitterLoadSuccess,
  twitterLoadFail,
} from '../actions/Twitter'

import { fromJS }  from 'immutable'
import { demoTwitterData } from '../../mockData/Twitter';

const DEMO_DATA = demoTwitterData;

it('should provide the initial state', () => {
  expect(twitter(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_SOCIAL_NETWORKS_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    error: null,
    data: null
  })
  expect(twitter(initialState, twitterLoadRequest('1'))).toEqual(state)
})

it('should handle LOAD_SOCIAL_NETWORKS_SUCCESS actions', () => {
  const payload = DEMO_DATA;
  const resultState = fromJS({
    isFetching: false,
    error: null,
    data: payload,
  })
  expect(twitter(initialState, twitterLoadSuccess(payload))).toEqual(resultState)
})

it('should handle LOAD_SOCIAL_NETWORKS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    error: new Error('Foo bar'),
    data: null,
  })
  expect(twitter(initialState, twitterLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    error: null,
    data: null,
  })
  expect(twitter(state, { type: 'unknown' })).toEqual(state)
})
