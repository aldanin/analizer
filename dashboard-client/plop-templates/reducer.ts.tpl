import * as Redux from 'redux'
import { {{ typeName }}Data } from '../../types/{{ typeName }}'

import {
  LOAD_{{ constantCase name }}_REQUEST,
  LOAD_{{ constantCase name }}_SUCCESS,
  LOAD_{{ constantCase name }}_FAIL,
} from '../actions/{{ properCase name }}'

import {
  {{ properCase name }}LoadRequestAction,
  {{ properCase name }}LoadSuccessAction,
  {{ properCase name }}LoadFailAction,
} from '../actions/{{ properCase name }}'

// combine action types
export type action = {{ properCase name }}LoadRequestAction
  | {{ properCase name }}LoadSuccessAction
  | {{ properCase name }}LoadFailAction
  | Redux.Action

interface State {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
  data: {{ typeName }}Data[],
}

export const initialState: State = {
  isFetching: false,
  lastFetchTs: 0,
  error: null,
  data: [],
}

function {{ properCase name }}(state: State = initialState, action: action) {
  switch (action.type) {
    case LOAD_{{ constantCase name }}_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: [],
      })
    }
    case LOAD_{{ constantCase name }}_SUCCESS: {
      const { payload, timestamp } = (<{{ properCase name }}LoadSuccessAction> action)
      return Object.assign({}, state, {
        isFetching: false,
        lastFetchTs: timestamp,
        error: null,
        data: payload,
      })
    }
    case LOAD_{{ constantCase name }}_FAIL: {
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: (<{{ properCase name }}LoadFailAction> action).error
      })
    }
    default:
      return state
  }
}

export default {{ properCase name }}
