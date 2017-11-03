import * as Redux from 'redux'
import { TargetData } from '../../types/Target'

export const LOAD_TARGETS_REQUEST = 'Targets/LOAD_REQUEST'
export const LOAD_TARGETS_SUCCESS = 'Targets/LOAD_SUCCESS'
export const LOAD_TARGETS_FAIL = 'Targets/LOAD_FAIL'

export interface TargetsLoadRequestAction extends Redux.Action {
}
/**
 * Load the targets, this action starts the request saga
 */
export function targetsLoadRequest(): TargetsLoadRequestAction {
  return {
    type: LOAD_TARGETS_REQUEST,
  };
}

export interface TargetsLoadSuccessAction extends Redux.Action {
  payload: TargetData[]
}
/**
 * Dispatched when the targets are loaded by the request saga
 */
export function targetsLoadSuccess(payload: TargetData[]): TargetsLoadSuccessAction {
  return {
    type: LOAD_TARGETS_SUCCESS,
    payload,
  };
}

export interface TargetsLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the targets fails
 */
export function targetsLoadFail(error: Error): TargetsLoadFailAction {
  return {
    type: LOAD_TARGETS_FAIL,
    error,
  };
}
