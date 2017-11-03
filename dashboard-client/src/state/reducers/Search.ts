import * as Redux from 'redux'
import { fromJS }  from 'immutable'
import * as Immutable from 'immutable'
import { SET_KEYWORD, SET_RESULTS_COUNTER, SetKeywordAction, SetResultsCounterAction } from '../actions/Search';

// combine action types
export type Action = SetKeywordAction | Redux.Action

interface State extends Immutable.Map<string, any>  {
  keyWord: string;
  recentlyKeywords: string[];
  resultsCounter: number;
}

export const initialState: State = fromJS({
  keyWord: '',
  recentlyKeywords: [],
  resultsCounter: -1,
});

function searchReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_KEYWORD: {
      return state
        .set('resultsCounter', -1)
        .set('keyWord', (action as SetKeywordAction).keyWord);
    }
    case SET_RESULTS_COUNTER: {
      return state
        .set('resultsCounter', (action as SetResultsCounterAction).results);
    }

    default:
      return state
  }
}

export default searchReducer
