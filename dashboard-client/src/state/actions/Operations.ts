import * as Redux from 'redux'
import { OperationData } from '../../types/Operation'

export const LOAD_OPERATIONS_REQUEST = 'Operations/LOAD_REQUEST'
export const LOAD_OPERATIONS_SUCCESS = 'Operations/LOAD_SUCCESS'
export const LOAD_OPERATIONS_FAIL = 'Operations/LOAD_FAIL'

export interface OperationsLoadAction extends Redux.Action {
}
/**
 * Load the operations, this action starts the request saga
 */
export function operationsLoad(): OperationsLoadAction {
  return {
    type: LOAD_OPERATIONS_REQUEST,
  };
}

export interface OperationsLoadSuccessAction extends Redux.Action {
  payload: OperationData[]
}
/**
 * Dispatched when the operations are loaded by the request saga
 */
export function operationsLoadSuccess(payload: OperationData[]): OperationsLoadSuccessAction {
  return {
    type: LOAD_OPERATIONS_SUCCESS,
    payload,
  };
}

export interface OperationsLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the operations fails
 */
export function operationsLoadFail(error: Error): OperationsLoadFailAction {
  return {
    type: LOAD_OPERATIONS_FAIL,
    error,
  };
}
