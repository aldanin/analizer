import * as Redux from 'redux'
import { Location as LocationData } from 'common-interfaces/types/Location';
import { AgentId } from '../../types/Agent';

export const LOAD_LOCATION_REQUEST = 'Location/LOAD_REQUEST';
export const LOAD_LOCATION_SUCCESS = 'Location/LOAD_SUCCESS';
export const LOAD_LOCATION_FAIL = 'Location/LOAD_FAIL';

export interface LocationLoadRequestAction extends Redux.Action {
  agentId: AgentId;
}
/**
 * Load the location view, this action starts the request saga
 */
export function locationLoadRequest(agentId: AgentId): LocationLoadRequestAction {
  return {
    type: LOAD_LOCATION_REQUEST,
    agentId,
  };
}

export interface LocationLoadSuccessAction extends Redux.Action {
  timestamp: number,
  data: LocationData[],
}

/**
 * Dispatched when the location are loaded by the request saga
 */
export function locationLoadSuccess(data: LocationData[], timestamp: number = Date.now()): LocationLoadSuccessAction {
  return {
    type: LOAD_LOCATION_SUCCESS,
    timestamp,
    data,
  };
}

export interface LocationLoadFailAction extends Redux.Action {
  error: Error
}

/**
 * Dispatched when loading the location fails
 */
export function locationLoadFail(error: Error): LocationLoadFailAction {
  return {
    type: LOAD_LOCATION_FAIL,
    error,
  };
}
