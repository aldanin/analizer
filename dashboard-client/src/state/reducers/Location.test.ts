import * as Redux from 'redux'
import Location from './Location'
import { initialState } from './Location'
import { fromJS } from 'immutable';
import { locationLoadFail, locationLoadRequest } from '../actions/Location';
import { demoLocationData } from '../../mockData/Location';

it('should provide the initial state', () => {
  expect(Location(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_LOCATION_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    data: null,
  })
  expect(Location(initialState, locationLoadRequest('1234'))).toEqual(state)
})

it('should handle LOAD_LOCATION_SUCCESS actions', () => {
  const payload = demoLocationData;

  const resultState = fromJS({
    isFetching: false,
    lastFetchTs: 123456,
    error: null,
    data: payload,
  })

  expect(Location(initialState, locationLoadRequest('1234'))).toEqual(resultState)
})

it('should handle LOAD_LOCATION_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    lastFetchTs: 0,
    error: new Error('Foo bar'),
    data: null,
  })
  expect(Location(initialState, locationLoadFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    lastFetchTs: 123,
    error: null,
    data: null,
  })
  expect(Location(state, { type: 'unknown' })).toEqual(state)
})
