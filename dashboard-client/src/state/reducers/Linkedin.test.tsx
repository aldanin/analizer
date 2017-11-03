import * as Redux from 'redux'
import linkedin from './Linkedin'
import { initialState } from './Linkedin'
import { fromJS }  from 'immutable'
import {
  linkedinLoadFail, linkedinLoadRequest, linkedinLoadSuccess,
} from '../actions/Linkedin';
import { demoLinkedinData } from '../../mockData/Linkedin';

const DEMO_DATA = demoLinkedinData;

it('should provide the initial state', () => {
  expect(linkedin(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_SOCIAL_NETWORKS_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    isSorting: false,
    connectionSortBy: 0,
    error: null,
    data: null
  })
  expect(linkedin(initialState, linkedinLoadRequest('1'))).toEqual(state)
})

it('should handle LOAD_SOCIAL_NETWORKS_SUCCESS actions', () => {
  const payload = DEMO_DATA;
  const resultState = fromJS({
    isFetching: false,
    isSorting: false,
    connectionSortBy: 0,
    error: null,
    data: payload,
  })
  expect(linkedin(initialState, linkedinLoadSuccess(payload))).toEqual(resultState)
})

it('should handle LOAD_SOCIAL_NETWORKS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    isSorting: false,
    connectionSortBy: 0,
    error: new Error('Foo bar'),
    data: null,
  })
  expect(linkedin(initialState, linkedinLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    isSorting: false,
    connectionSortBy: 0,
    error: null,
    data: null,
  })
  expect(linkedin(state, { type: 'unknown' })).toEqual(state)
})
