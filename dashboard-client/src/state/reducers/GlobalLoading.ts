/*
 * Global counter for pending requests
 * Used for showing / hiding a loding animation
 */
import * as Redux from 'redux'

import {
  LOAD_AGENTS_REQUEST,
  LOAD_AGENTS_SUCCESS,
  LOAD_AGENTS_FAIL,
} from '../actions/Agents'

interface State {
  count: number;
}

// The initial state of the App
export const initialState: State = {
  count: 0
}

function globalLoadingReducer(state: State = initialState, action: Redux.Action) {
  switch (action.type) {
    // all actions that start a fetch
    case LOAD_AGENTS_REQUEST:
      return { count: state.count + 1}
    // all actions that end a fetch
    case LOAD_AGENTS_SUCCESS:
    case LOAD_AGENTS_FAIL:
      return { count: state.count - 1}
    default:
      return state;
  }
}

export default globalLoadingReducer
