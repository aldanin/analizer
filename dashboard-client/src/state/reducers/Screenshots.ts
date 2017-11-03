import * as Redux from 'redux'
import { ScreenshotData, ScreenshotId, INITIAL_ID } from '../../types/Screenshot'
import { Filters, DEFAULT_FILTERS } from '../../types/GenericFilters'
import * as actions from '../actions/Screenshots'

import * as StdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'

import stdUpdateData from './StdProductActionPlainJs'

// combine action types
export type Action =
    actions.ScreenshotsLoadRequestAction
  | actions.ScreenshotsLoadSuccessAction
  | actions.ScreenshotsLoadFailAction
  | actions.ScreenshotsSetFavFailAction
  | actions.ScreenshotsSetFavRequestAction
  | actions.ScreenshotsSetFavSuccessAction
  | actions.ScreenshotsSetFiltersAction
  | Redux.Action

interface State {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
  data: ScreenshotData[],
  oldestId: ScreenshotId,
  newestId: ScreenshotId,
  totalOldestId: ScreenshotId,
  totalNewestId: ScreenshotId,
  filters: Filters,
}

export const initialState: State = {
  isFetching: false,
  lastFetchTs: 0,
  error: null,
  data: [],
  oldestId: INITIAL_ID,
  newestId: INITIAL_ID,
  totalOldestId: INITIAL_ID,
  totalNewestId: INITIAL_ID,
  filters: DEFAULT_FILTERS,
}

function Screenshots(state: State = initialState, action: Action) {
  switch (action.type) {
    case actions.LOAD_INITIAL_SCREENSHOTS: {
      return Object.assign({}, state, {
        error: null,
        data: [],
      })
    }
    case actions.LOAD_SCREENSHOTS: {
      return state
    }
    case actions.SET_SCREENSHOTS_FILTERS: {
      const { filters } = (<actions.ScreenshotsSetFiltersAction> action)
      return Object.assign({}, state, {
        filters,
        error: null,
        data: [],
      })
    }
    // case actions.SET_FAV_SCREENSHOTS: {
    //   return state
    // }

    case actions.LOAD_SCREENSHOTS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      })
    }
    case actions.LOAD_SCREENSHOTS_SUCCESS: {
      const { data, totalOldestId, totalNewestId, isOlder, timestamp } = (<actions.ScreenshotsLoadSuccessAction> action)
      if (data.length === 0) {
        return Object.assign({}, state, {
          isFetching: false,
          lastFetchTs: timestamp,
          error: null,
          totalOldestId,
          totalNewestId,
        })
      }
      const newData = isOlder ? state.data.concat(data) : data.concat(state.data)
      return Object.assign({}, state, {
        isFetching: false,
        lastFetchTs: timestamp,
        error: null,
        data: newData,
        oldestId: newData[newData.length - 1].id,
        newestId: newData[0].id,
        totalOldestId,
        totalNewestId,
      })
    }
    case actions.LOAD_SCREENSHOTS_FAIL: {
      return Object.assign({}, state, {
        isFetching: false,
        error: (<actions.ScreenshotsLoadFailAction> action).error
      })
    }
    // case actions.SET_FAV_SCREENSHOTS_REQUEST: {
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     error: null,
    //   })
    // }
    // case actions.SET_FAV_SCREENSHOTS_SUCCESS: {
    //   const {id, isFavorite} = (<actions.ScreenshotsSetFavSuccessAction> action)
    //   const updatedData = state.data.map(item => {
    //     return item.id === id ?
    //       Object.assign({}, item, {isFavorite: isFavorite}) :
    //       item
    //   })
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     data: updatedData,
    //   })
    // }
    // case actions.SET_FAV_SCREENSHOTS_FAIL: {
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     error: (<actions.ScreenshotsLoadFailAction> action).error
    //   })
    // }
    default:
      if ('productType' in action
        && (action as StdActions.ProductAction).productType === PRODUCT_TYPES.SCREENSHOT) {
        return Object.assign({}, state, {
          data: stdUpdateData(state.data, (action as StdActions.ProductAction)),
        })
      }
      return state
  }
}

export default Screenshots
