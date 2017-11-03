import * as Redux from 'redux'
import { AgentId } from '../../types/Agent';
import { SummaryData } from '../../types/Summary';

export const LOAD_SUMMARY_REQUEST = 'Summary/LOAD_REQUEST'
export const LOAD_SUMMARY_SUCCESS = 'Summary/LOAD_SUCCESS'
export const LOAD_SUMMARY_FAIL = 'Summary/LOAD_FAIL'
export const SUMMARY_SORT_DATA = 'Summary/SORT_DATA'

export interface SummaryLoadRequestAction extends Redux.Action {
}

/**
 * Load the snapshots, this action starts the request saga
 */
export function summaryLoadRequest(agent: AgentId): SummaryLoadRequestAction {
  return {
    type: LOAD_SUMMARY_REQUEST,
  };
}

export interface SummaryLoadSuccessAction extends Redux.Action {
  payload: SummaryData[],
  timestamp: number,
}
/**
 * Dispatched when the snapshots are loaded by the request saga
 */
export function summaryLoadSuccess(payload: SummaryData[], timestamp: number = Date.now()):
SummaryLoadSuccessAction {
  return {
    type: LOAD_SUMMARY_SUCCESS,
    payload,
    timestamp,
  };
}

export interface SummaryLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the snapshots fails
 */
export function summaryLoadFail(error: Error): SummaryLoadFailAction {
  return {
    type: LOAD_SUMMARY_FAIL,
    error,
  };
}

export interface SortOptionAction extends Redux.Action {
  sortFilter: number;
}

/**
 * Dispatched when sort option selected
 */
export function sortOptionSelected(sortFilter: number): SortOptionAction {
  return {
    type: SUMMARY_SORT_DATA,
    sortFilter,
  };
}
