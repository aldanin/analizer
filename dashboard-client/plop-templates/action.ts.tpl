import * as Redux from 'redux'
import { {{ typeName }}Data } from '../../types/{{ typeName }}'

// -------------
// User initiated
// -------------
export const LOAD_{{ constantCase name }} = '{{ properCase name }}/LOAD'
export interface {{ properCase name }}LoadAction extends Redux.Action {
  count: number,
}
export function {{ camelCase name }}Load(count: number): {{ properCase name }}LoadAction {
  return {
    type: LOAD_{{ constantCase name }},
    count,
  };
}

// ------------
// API related
// ------------
/**
 * Load the {{ lowerCase name }}, this action starts the request saga
 */
export const LOAD_{{ constantCase name }}_REQUEST = '{{ properCase name }}/LOAD_REQUEST'
export interface {{ properCase name }}LoadRequestAction extends Redux.Action {
}
export function {{ camelCase name }}LoadRequest(): {{ properCase name }}LoadRequestAction {
  return {
    type: LOAD_{{ constantCase name }}_REQUEST,
  };
}

/**
 * Dispatched when the {{ lowerCase name }} are loaded by the request saga
 */
export const LOAD_{{ constantCase name }}_SUCCESS = '{{ properCase name }}/LOAD_SUCCESS'
export interface {{ properCase name }}LoadSuccessAction extends Redux.Action {
  payload: {{ typeName }}Data[],
  timestamp: number,
}
export function {{ camelCase name }}LoadSuccess(payload: {{ typeName }}Data[], timestamp: number = Date.now()): {{ properCase name }}LoadSuccessAction {
  return {
    type: LOAD_{{ constantCase name }}_SUCCESS,
    payload,
    timestamp,
  };
}

/**
 * Dispatched when loading the {{ lowerCase name }} fails
 */
export const LOAD_{{ constantCase name }}_FAIL = '{{ properCase name }}/LOAD_FAIL'
export interface {{ properCase name }}LoadFailAction extends Redux.Action {
  error: Error
}
export function {{ camelCase name }}LoadFail(error: Error): {{ properCase name }}LoadFailAction {
  return {
    type: LOAD_{{ constantCase name }}_FAIL,
    error,
  };
}
