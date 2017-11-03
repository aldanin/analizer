import * as Redux from 'redux'
import browserReducer from './Browser'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import { initialState } from './Browser'
import {
  browserLoadRequest,
  browserLoadSuccess,
  browserLoadFail,
} from '../actions/Browser'

import { BrowserData } from '../../types/Browser'
import { AgentId } from '../../types/Agent';

it('should provide the initial state', () => {
  expect(browserReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_BROWSER_REQUEST actions', () => {
  const state = {
    action: 'Browser/LOAD_REQUEST',
    isFetching: true,
    error: null,
    browserData: {},
    isGroupMode: false,
    productData: [],
  }
  let receivedData = browserReducer(initialState, browserLoadRequest({id: 1234}));
  expect(receivedData.toJS()).toEqual(state)
})

it('should handle LOAD_BROWSER_SUCCESS actions', () => {
  const payload = [];
  const resultState = {
    action: 'Browser/LOAD_SUCCESS',
    isFetching: false,
    error: null,
    browserData: [],
    isGroupMode: false,
    productData: [],
  }
  let receivedData = browserReducer(initialState, browserLoadSuccess(payload));
  expect(receivedData.toJS()).toEqual(resultState)
})

it('should handle LOAD_BROWSER_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    action: '',
    isFetching: false,
    error: new Error('Foo bar'),
    browserData: [],
    isGroupMode: false,
    productData: [],
  }
  let receivedData = browserReducer(initialState, browserLoadFail(payload));
  expect(receivedData.toJS()).toEqual(resultState);
})

it('should ignore unknown actions', () => {
  interface State extends Immutable.Map<string, any> {
    isFetching: boolean,
    error: Error,
    browserData: BrowserData[],
    agentId: AgentId,
    productData: any,
    isGroupMode: boolean,
  }

  const localInitialState: State = fromJS ({
    isFetching: false,
    error: null,
    data: [],
    isGroupMode: true,
    productData: [],
  });

  let state = localInitialState;

  expect(browserReducer(state, { type: 'unknown' })).toEqual(state)
})
