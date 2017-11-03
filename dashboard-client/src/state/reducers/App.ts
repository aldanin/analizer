import * as Redux from 'redux'
import { fromJS, is }  from 'immutable'
import * as Immutable from 'immutable'
import {
  AgentSelectionAction, APP_NAV_MENU_ERROR, APP_NAV_MENU_REQUEST, APP_NAV_MENU_SUCCESS, APP_PAGE_NAVIGATE,
  APP_SELECT_AGENT, NavMenuLoadErrorAction,
  NavMenuLoadSuccessAction, PageNavigateAction
} from '../actions/App';
import { AgentUnreadProducts } from '../../types/Agent';
import { ProductID } from '../../types/Product';
import { PRODUCT_SELECT_ITEM, ProductSelectItemAction } from '../actions/ProductActions';

const DEFAULT_STATE = {
  productSum: {
    userApps: null,
    sensors: null,
    deviceSystem: null,
  },
  userApps: {
    calls: null,
    im: null,
    mail: null,
    contacts: null,
    socialNetwork: null,
    browser: null,
    gallery: null,
    calendar: null,
  },
  sensors: {
    activity: null,
    snapshots: null,
    envAudio: null,
    locations: null,
  },
  deviceSystem: {
    directory: null,
    systemInfo: null,
    accounts: null,
  }
}

// combine action types
export type Action = AgentSelectionAction | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isMenuFetching: boolean;
  agentId: number;
  error: Error;
  currentPage: string;
  menuData: AgentUnreadProducts;
  currentProduct: ProductID;
}

export const initialState: State = fromJS({
  isMenuFetching: false,
  agentId: null,
  error: null,
  currentPage: '',
  menuData: DEFAULT_STATE,
  currentProduct: null,
});

function appReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case APP_SELECT_AGENT: {
      return state
        .set('agentId', (action as AgentSelectionAction).payload.agentId)
        .set('menuData', fromJS(DEFAULT_STATE))
        .set('isMenuFetching', true)
    }

    case APP_NAV_MENU_REQUEST: {
      return state
        .set('isMenuFetching', true);
    }

    case APP_NAV_MENU_SUCCESS: {
      const data = ((action as NavMenuLoadSuccessAction).payload.data) === null ?
        DEFAULT_STATE : (action as NavMenuLoadSuccessAction).payload.data;

      const newData = fromJS(data);
      const oldData = state.get('menuData')
      if (is(newData, oldData) === true) {return state}
      return state
        .set('menuData', fromJS(newData))
        .set('isMenuFetching', false)
    }

    case APP_NAV_MENU_ERROR: {
      return state
        .set('error', (action as NavMenuLoadErrorAction).payload.error.message)
        .set('isMenuFetching', false)
    }

    case APP_PAGE_NAVIGATE: {
      return state
        .set('currentPage', (action as PageNavigateAction).payload.page)
    }

    case PRODUCT_SELECT_ITEM: {
      return state
        .set('currentProduct', (action as ProductSelectItemAction).payload.id)
    }

    default:
      return state
  }
}

export default appReducer
