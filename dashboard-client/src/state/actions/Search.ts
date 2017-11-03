import * as Redux from 'redux'

export const SET_KEYWORD = 'Search/SET_KEYWORD';
export const SET_RESULTS_COUNTER = 'Search/SET_RESULTS_COUNTER';

export interface SetKeywordAction extends Redux.Action {
  keyWord: string;
}

/**
 * Dispatch when the user execute a search
 */
export function searchKeyWord(keyWord: string): SetKeywordAction {
  return {
    type: SET_KEYWORD,
    keyWord,
  };
}

export interface SetResultsCounterAction extends Redux.Action {
  results: number;
}

/**
 * Dispatch when the user execute a search
 */
export function setResultsCounter(results: number): SetResultsCounterAction {
  return {
    type: SET_RESULTS_COUNTER,
    results,
  };
}
