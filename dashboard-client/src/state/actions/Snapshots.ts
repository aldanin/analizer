import * as Redux from 'redux'
import { SnapshotsData } from '../../types/Snapshots'
import { AgentId } from '../../types/Agent';

export const LOAD_SNAPSHOTS_REQUEST = 'Snapshots/LOAD_REQUEST';
export const LOAD_SNAPSHOTS_SUCCESS = 'Snapshots/LOAD_SUCCESS';
export const LOAD_SNAPSHOTS_FAIL = 'Snapshots/LOAD_FAIL';

export interface SnapshotsLoadRequestAction extends Redux.Action {
  agent: AgentId;
}

/**
 * Load the snapshots, this action starts the request saga
 */
export function snapshotsLoadRequest(agent: AgentId): SnapshotsLoadRequestAction {
  return {
    type: LOAD_SNAPSHOTS_REQUEST,
    agent,
  };
}

export interface SnapshotsLoadSuccessAction extends Redux.Action {
  payload: SnapshotsData[],
  timestamp: number,
}
/**
 * Dispatched when the snapshots are loaded by the request saga
 */
export function snapshotsLoadSuccess(payload: SnapshotsData[], timestamp: number = Date.now()):
  SnapshotsLoadSuccessAction {
  return {
    type: LOAD_SNAPSHOTS_SUCCESS,
    payload,
    timestamp,
  };
}

export interface SnapshotsLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the snapshots fails
 */
export function snapshotsLoadFail(error: Error): SnapshotsLoadFailAction {
  return {
    type: LOAD_SNAPSHOTS_FAIL,
    error,
  };
}
