import * as Redux from 'redux'
import { AgentData } from '../../types/Agent'

import {
  LOAD_AGENTS_REQUEST,
  LOAD_AGENTS_SUCCESS,
  LOAD_AGENTS_FAIL,
} from '../actions/Agents'

import {
  AgentsLoadAction,
  AgentsLoadSuccessAction,
  AgentsLoadFailAction,
} from '../actions/Agents'

// combine action types
export type Action = AgentsLoadAction
  | AgentsLoadSuccessAction
  | AgentsLoadFailAction
  | Redux.Action

interface State {
  isFetching: boolean,
  error: Error | null,
  data: AgentData[],
}

export const initialState: State = {
  isFetching: false,
  error: null,
  data: [],
}

function Agents(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_AGENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: [],
      })
    case LOAD_AGENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        data: (<AgentsLoadSuccessAction> action).payload,
      })
    case LOAD_AGENTS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: (<AgentsLoadFailAction> action).error
      })
    default:
      return state
  }
}

export default Agents
