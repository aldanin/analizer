import * as Redux from 'redux'
import socialNetworksReducer from './SocialNetworks'
import { initialState } from './SocialNetworks'
import {
  socialNetworksLoadRequest,
  socialNetworksLoadSuccess,
  socialNetworksLoadFail,
} from '../actions/SocialNetworks'

import { fromJS }  from 'immutable'

it('should provide the initial state', () => {
  expect(socialNetworksReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_SOCIAL_NETWORKS_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
  })
  expect(socialNetworksReducer(initialState, socialNetworksLoadRequest('1'))).toEqual(state)
})

it('should handle LOAD_SOCIAL_NETWORKS_SUCCESS actions', () => {
  const resultState = fromJS({
    isFetching: false,
    lastFetchTs: 123456,
    error: null,
  })
  expect(socialNetworksReducer(initialState, socialNetworksLoadSuccess(123456))).toEqual(resultState)
})

it('should handle LOAD_SOCIAL_NETWORKS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    lastFetchTs: 0,
    error: new Error('Foo bar'),
  })
  expect(socialNetworksReducer(initialState, socialNetworksLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    lastFetchTs: 123,
    error: null,
  })
  expect(socialNetworksReducer(state, { type: 'unknown' })).toEqual(state)
})
