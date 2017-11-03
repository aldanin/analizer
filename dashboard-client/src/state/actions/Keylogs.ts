import * as Redux from 'redux'
import { KeylogData } from '../../types/Keylog'
import { Filters } from '../../types/GenericFilters'

// -------------
// User initiated
// -------------
export const LOAD_KEYLOGS = 'Keylogs/LOAD'
export interface KeylogsLoadAction extends Redux.Action {
  count: number,
}
export function keylogsLoad(count: number): KeylogsLoadAction {
  return {
    type: LOAD_KEYLOGS,
    count,
  };
}

/**
 * set filters for keylogs
 */
export const SET_KEYLOGS_FILTERS = 'Keylogs/SET_FILTERS'
export interface KeylogsSetFiltersAction extends Redux.Action {
  filters: Filters,
  count: number,
}
export function keylogsSetFilters(filters: Filters, count: number): KeylogsSetFiltersAction {
  return {
    type: SET_KEYLOGS_FILTERS,
    filters,
    count,
  };
}

// ------------
// API related
// ------------
/**
 * Load the keylogs, this action starts the request saga
 */
export const LOAD_KEYLOGS_REQUEST = 'Keylogs/LOAD_REQUEST'
export interface KeylogsLoadRequestAction extends Redux.Action {
}
export function keylogsLoadRequest(): KeylogsLoadRequestAction {
  return {
    type: LOAD_KEYLOGS_REQUEST,
  };
}

/**
 * Dispatched when the keylogs are loaded by the request saga
 */
export const LOAD_KEYLOGS_SUCCESS = 'Keylogs/LOAD_SUCCESS'
export interface KeylogsLoadSuccessAction extends Redux.Action {
  payload: KeylogData[],
  timestamp: number,
}
export function keylogsLoadSuccess(payload: KeylogData[], timestamp: number = Date.now()): KeylogsLoadSuccessAction {
  return {
    type: LOAD_KEYLOGS_SUCCESS,
    payload,
    timestamp,
  };
}

/**
 * Dispatched when loading the keylogs fails
 */
export const LOAD_KEYLOGS_FAIL = 'Keylogs/LOAD_FAIL'
export interface KeylogsLoadFailAction extends Redux.Action {
  error: Error
}
export function keylogsLoadFail(error: Error): KeylogsLoadFailAction {
  return {
    type: LOAD_KEYLOGS_FAIL,
    error,
  };
}
