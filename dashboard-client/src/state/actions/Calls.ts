import * as Redux from 'redux'
import * as Calls from '../../types/Calls';
import * as Agent from '../../types/Agent';

export interface CallsLoadRequestAction extends Redux.Action {
  nextPageNumber: number;
  agentId: Agent.AgentId;
  lastId: number;
  filters: Calls.Filters;
  pageSize: number;
}

export interface CallsLoadSuccessAction extends Redux.Action {
  payload: {
    callsData: Calls.CallData[];
    nextPageNumber: number;
    totalCount: number;
  }
}

export interface CallsLoadFailAction extends Redux.Action {
  error: Error,
}

// }

export interface CallsFiltersProps {
  agentId: number;
}

export interface CallsReadStatusFailAction extends Redux.Action {
  error: Error
}

export const CALLS_LOAD_REQUEST = 'CALLS/LOAD_REQUEST';
export const CALLS_LOAD_SUCCESS = 'CALLS/LOAD_SUCCESS';
export const CALLS_LOAD_FAIL = 'CALLS/LOAD_FAIL';

export function callsLoadRequest(agentId: Agent.AgentId,
                                 nextPageNumber: number,
                                 pageSize: number,
                                 filters: Calls.Filters,
                                 lastId?: number): CallsLoadRequestAction {

  return {
    type: CALLS_LOAD_REQUEST,
    agentId,
    nextPageNumber,
    pageSize,
    filters,
    lastId,
  };
}

export function callsLoadSuccess(callsData: Calls.CallData[],
                                 nextPageNumber: number,
                                 totalCount: number,
                                 ): CallsLoadSuccessAction {
  return {
    type: CALLS_LOAD_SUCCESS,
    payload: {
      callsData: callsData,
      nextPageNumber,
      totalCount: totalCount,
    }
  };
}

/**
 * Dispatched when loading the gallery fails
 */
export function callsLoadError(error: Error): CallsLoadFailAction {
  return {
    type: CALLS_LOAD_FAIL,
    error,
  };
}

export const CALLS_FILTERS_CHANGE = 'Calls/CALLS_FILTERS_CHANGE';

export interface FiltersProps {
  filters: Calls.Filters
}

export interface FiltersChangeActionProps extends Redux.Action {
  payload: {
    filters: Calls.Filters
  }
}

export function filtersChange(payload: FiltersProps): FiltersChangeActionProps {
  return {
    type: CALLS_FILTERS_CHANGE,
    payload,
  };
}
