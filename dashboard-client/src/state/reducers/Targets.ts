import * as Redux from 'redux'
import { TargetData } from '../../types/Target'

import {
  LOAD_TARGETS_REQUEST,
  LOAD_TARGETS_SUCCESS,
  LOAD_TARGETS_FAIL,
} from '../actions/Targets'

import {
  TargetsLoadRequestAction,
  TargetsLoadSuccessAction,
  TargetsLoadFailAction,
} from '../actions/Targets'

// combine action types
export type Action = TargetsLoadRequestAction
  | TargetsLoadSuccessAction
  | TargetsLoadFailAction
  | Redux.Action

interface State {
  isFetching: boolean,
  error: Error | null,
  data: TargetData[],
}

export const initialState: State = {
  isFetching: false,
  error: null,
  data: [],
}

function Targets(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_TARGETS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: [],
      })
    case LOAD_TARGETS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        data: (<TargetsLoadSuccessAction> action).payload,
      })
    case LOAD_TARGETS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: (<TargetsLoadFailAction> action).error
      })
    default:
      return state
  }
}

export default Targets
