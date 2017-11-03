import * as Redux from 'redux'
import { initialState } from './Notebook'
import { fromJS }  from 'immutable'
import notebook from './Notebook';
import { notebookDataFail, notebookDataSuccess, notebookRequest } from '../actions/Notebook';
import { demoNotebookData } from '../../mockData/Notebook';

const DEMO_DATA = demoNotebookData;

it('should provide the initial state', () => {
  expect(notebook(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle NOTEBOOK_DATA_REQUEST actions', () => {
  const state = fromJS({
    isFetching: true,
    error: null,
    data: null,
  })
  expect(notebook(initialState, notebookRequest(1234))).toEqual(state)
})

it('should handle NOTEBOOK_DATA_SUCCESS actions', () => {
  const payload = DEMO_DATA;
  const resultState = fromJS({
    isFetching: false,
    error: null,
    data: payload,
  })

  expect(notebook(initialState, notebookDataSuccess(payload))).toEqual(resultState)
})

it('should handle LOAD_SUMMARY_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = fromJS({
    isFetching: false,
    error: new Error('Foo bar'),
    data: null,
  })
  expect(notebook(initialState, notebookDataFail(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    error: null,
    data: null,
  })
  expect(notebook(state, { type: 'unknown' })).toEqual(state)
})
