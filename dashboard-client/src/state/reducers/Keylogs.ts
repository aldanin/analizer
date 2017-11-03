import * as Redux from 'redux'
import { KeylogData } from '../../types/Keylog'
import * as StdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'
import stdUpdateData from './StdProductActionPlainJs'
import { Filters, DEFAULT_FILTERS } from '../../types/GenericFilters'

import {
  LOAD_KEYLOGS_REQUEST,
  LOAD_KEYLOGS_SUCCESS,
  LOAD_KEYLOGS_FAIL,
  SET_KEYLOGS_FILTERS,
} from '../actions/Keylogs'

import {
  KeylogsLoadRequestAction,
  KeylogsLoadSuccessAction,
  KeylogsLoadFailAction,
  KeylogsSetFiltersAction,
} from '../actions/Keylogs'

// combine action types
export type Action = KeylogsLoadRequestAction
  | KeylogsLoadSuccessAction
  | KeylogsLoadFailAction
  | KeylogsSetFiltersAction
  | Redux.Action

interface State {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
  data: KeylogData[],
  filters: Filters,
}

export const initialState: State = {
  isFetching: false,
  lastFetchTs: 0,
  error: null,
  data: [],
  filters: DEFAULT_FILTERS,
}

function Keylogs(state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_KEYLOGS_FILTERS: {
      const { filters } = (<KeylogsSetFiltersAction> action)
      return Object.assign({}, state, {
        filters,
        error: null,
        data: [],
      })
    }
    case LOAD_KEYLOGS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: [],
      })
    }
    case LOAD_KEYLOGS_SUCCESS: {
      const { payload, timestamp } = (<KeylogsLoadSuccessAction> action)
      return Object.assign({}, state, {
        isFetching: false,
        lastFetchTs: timestamp,
        error: null,
        data: payload,
      })
    }
    case LOAD_KEYLOGS_FAIL: {
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: (<KeylogsLoadFailAction> action).error
      })
    }
    default:
      if ('productType' in action
        && (action as StdActions.ProductAction).productType === PRODUCT_TYPES.KEYLOG) {
        return Object.assign({}, state, {
          data: stdUpdateData(state.data, (action as StdActions.ProductAction)),
        })
      }
      return state
  }
}

export default Keylogs
