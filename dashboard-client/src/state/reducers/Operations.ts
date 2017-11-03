import * as Redux from 'redux'
import { OperationData } from '../../types/Operation'

import {
  LOAD_OPERATIONS_REQUEST,
  LOAD_OPERATIONS_SUCCESS,
  LOAD_OPERATIONS_FAIL,
} from '../actions/Operations'

import {
  OperationsLoadAction,
  OperationsLoadSuccessAction,
  OperationsLoadFailAction,
} from '../actions/Operations'

// combine action types
export type Action = OperationsLoadAction
  | OperationsLoadSuccessAction
  | OperationsLoadFailAction
  | Redux.Action

interface State {
  isFetching: boolean,
  error: Error | null,
  data: OperationData[],
}

export const initialState: State = {
  isFetching: false,
  error: null,
  data: [],
}

function Operations(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_OPERATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: [],
      })
    case LOAD_OPERATIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        data: (<OperationsLoadSuccessAction> action).payload,
      })
    case LOAD_OPERATIONS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: (<OperationsLoadFailAction> action).error
      })
    default:
      return state
  }
}

export default Operations
