import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import * as stdProductReducer from './StdProductActionsImmutable'

import {
  LOAD_BROWSER_REQUEST,
  LOAD_BROWSER_SUCCESS,
  LOAD_BROWSER_FAIL,
  BROWSER_GROUP_BY_DOMAIN
} from '../actions/Browser'

import {
  BrowserLoadRequestAction,
  BrowserLoadSuccessAction,
  BrowserLoadFailAction,
} from '../actions/Browser'
import {
  ProductAction,
} from '../actions/ProductActions';
import { PRODUCT_TYPES } from '../../types/Product';
import { stdImmutableUpdateData } from './StdProductActionsImmutable';
import { ProductStateProps } from '../interfaces';
import { APP_SELECT_AGENT } from '../actions/App';

type State = Immutable.Map<string, any>

const initialJSState: ProductStateProps = Object.assign(stdProductReducer.initialJSState, {
  isGroupMode: false,
  browserData: [],
  action: '',
})

// combine action types
export type Action = BrowserLoadRequestAction
  | BrowserLoadSuccessAction
  | BrowserLoadFailAction
  | Redux.Action

export const initialState: State = fromJS(initialJSState);

function Browser(state: State = initialState, action: BrowserLoadRequestAction) {

  switch (action.type) {
    case LOAD_BROWSER_REQUEST:
      return state
        .set('action', action.type)
        .set('isFetching', true)
        .set('error', null)
        .set('browserData', Immutable.Map());

    case LOAD_BROWSER_SUCCESS:
      return state
        .set('action', action.type)
        .set('browserData', fromJS(action.payload))
        .set('isFetching', false)
        .set('error', null);

    case LOAD_BROWSER_FAIL:
      return state
        .set('isFetching', false)
        .set('error', (<BrowserLoadFailAction> action).error);

    case BROWSER_GROUP_BY_DOMAIN:
      return state
        .set('isFetching', true)
        .set('isGroupMode', action.payload);

    case APP_SELECT_AGENT:
      return initialState;

    default:
  }

  if ('productType' in action && (action as ProductAction).productType === PRODUCT_TYPES.BROWSER_BOOKMARK) {
    return stdImmutableUpdateData(
      ['browserData', 'browserData', 'bookmarks', 'browsers'], (action as ProductAction), state);
  }

  if ('productType' in action && (action as ProductAction).productType === PRODUCT_TYPES.BROWSER) {
    return stdImmutableUpdateData(
      ['productData'], (action as ProductAction), state);
  }

  return state;
}

export default Browser
