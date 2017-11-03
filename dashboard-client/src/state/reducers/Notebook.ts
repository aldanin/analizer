import * as Redux from 'redux'
import { fromJS }  from 'immutable'
import * as Immutable from 'immutable'
import { NotebookData } from '../../types/Notebook';
import {
  NOTEBOOK_DATA_FAIL, NOTEBOOK_DATA_REQUEST, NOTEBOOK_DATA_SUCCESS, NotebookFailAction,
  NotebookSuccessAction
} from '../actions/Notebook';

// combine action types
export type Action =
  | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  error: Error | null,
  data: NotebookData,
}

export const initialState: State = fromJS({
  isFetching: true,
  error: null,
  data: null,
});

function notebook(state: State = initialState, action: Action) {
  switch (action.type) {
    case NOTEBOOK_DATA_REQUEST: {
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('data', null)
    }
    case NOTEBOOK_DATA_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', fromJS((<NotebookSuccessAction> action).data))
    }
    case NOTEBOOK_DATA_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', new Error((action as NotebookFailAction).error.message))
        .set('data', null)
    }

    default:
      return state
  }
}

export default notebook
