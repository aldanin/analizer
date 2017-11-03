import * as Redux from 'redux'
import { BrowserData } from '../../types/Browser'

export const LOAD_BROWSER_REQUEST = 'Browser/LOAD_REQUEST'
export const LOAD_BROWSER_SUCCESS = 'Browser/LOAD_SUCCESS'
export const LOAD_BROWSER_FAIL = 'Browser/LOAD_FAIL'
export const BROWSER_GROUP_BY_DOMAIN = 'Browser/GROUP_BY_DOMAIN'

export interface BrowserAgent {
  id: number;
}

export interface BrowserLoadRequestAction extends Redux.Action {
  agent?: any;
  payload?: any;
}

/**
 * Load the browser, this action starts the request saga
 */
export function browserLoadRequest(agent: BrowserAgent): BrowserLoadRequestAction {
  return {
    type: LOAD_BROWSER_REQUEST,
    agent
  };
}

export interface BrowserLoadSuccessAction extends Redux.Action {
  payload: BrowserData[]
}
/**
 * Dispatched when the browser are loaded by the request saga
 */
export function browserLoadSuccess(payload: BrowserData[]): BrowserLoadSuccessAction {
  return {
    type: LOAD_BROWSER_SUCCESS,
    payload,
  };
}

export interface BrowserLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the browser fails
 */
export function browserLoadFail(error: Error): BrowserLoadFailAction {
  return {
    type: LOAD_BROWSER_FAIL,
    error,
  };
}

/**
 * Dispatched when user press on filter group by domain
 */
export function groupByDomain(payload: boolean): BrowserLoadRequestAction {
  return {
    type: BROWSER_GROUP_BY_DOMAIN,
    payload,
  };
}
