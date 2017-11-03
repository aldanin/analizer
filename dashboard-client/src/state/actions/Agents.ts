import * as Redux from 'redux'
import { AgentData } from '../../types/Agent'

export const LOAD_AGENTS_REQUEST = 'Agents/LOAD_REQUEST'
export const LOAD_AGENTS_SUCCESS = 'Agents/LOAD_SUCCESS'
export const LOAD_AGENTS_FAIL = 'Agents/LOAD_FAIL'

export interface AgentsLoadAction extends Redux.Action {
}
/**
 * Load the agents, this action starts the request saga
 */
export function agentsLoad(): AgentsLoadAction {
  return {
    type: LOAD_AGENTS_REQUEST,
  };
}

export interface AgentsLoadSuccessAction extends Redux.Action {
  payload: AgentData[]
}
/**
 * Dispatched when the agents are loaded by the request saga
 */
export function agentsLoadSuccess(payload: AgentData[]): AgentsLoadSuccessAction {
  return {
    type: LOAD_AGENTS_SUCCESS,
    payload,
  };
}

export interface AgentsLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the agents fails
 */
export function agentsLoadFail(error: Error): AgentsLoadFailAction {
  return {
    type: LOAD_AGENTS_FAIL,
    error,
  };
}
