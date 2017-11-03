import * as Redux from 'redux'
import { fromJS }  from 'immutable'
import * as Immutable from 'immutable'

import {
  LOAD_SUMMARY_FAIL,
  LOAD_SUMMARY_REQUEST, LOAD_SUMMARY_SUCCESS, SortOptionAction, SUMMARY_SORT_DATA, SummaryLoadFailAction,
  SummaryLoadRequestAction,
  SummaryLoadSuccessAction
} from '../actions/Summary';
import { SummaryData } from '../../types/Summary';
import { APP_SELECT_AGENT } from '../actions/App';

// combine action types
export type Action = SummaryLoadRequestAction
  | SummaryLoadSuccessAction
  | SummaryLoadFailAction
  | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  error: Error | null,
  filters: number,
  data: SummaryData,
}

export const initialState: State = fromJS({
  isFetching: true,
  error: null,
  filters: 1,
  data: [],
});

function Summary(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_SUMMARY_REQUEST: {
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('data', fromJS([]))
    }
    case LOAD_SUMMARY_SUCCESS: {
      const { payload } = (<SummaryLoadSuccessAction> action)

      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', fromJS(payload))
    }
    case LOAD_SUMMARY_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', new Error((action as SummaryLoadFailAction).error.message))
        .set('data', Immutable.List([]))
    }

    case SUMMARY_SORT_DATA: {
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('filters', (action as SortOptionAction).sortFilter)
        .set('data', fromJS([]));
    }

    case APP_SELECT_AGENT:
      return initialState;

    default:
      return state
  }
}

export default Summary
