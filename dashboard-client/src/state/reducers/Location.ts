import * as Redux from 'redux'
import * as Immutable from 'immutable'
// import { Location as LocationData } from 'common-interfaces/types/Location';
import * as ProdActions from '../actions/ProductActions'
import { ProductStateProps } from '../interfaces';
import * as stdProductReducer from './StdProductActionsImmutable'
import { stdImmutableUpdateData } from './StdProductActionsImmutable';

// import {
//   LOAD_LOCATION_REQUEST,
//   LOAD_LOCATION_SUCCESS,
//   LOAD_LOCATION_FAIL,
// } from '../actions/Location'

import {
  LocationLoadRequestAction,
  LocationLoadSuccessAction,
  LocationLoadFailAction,
} from '../actions/Location'
import { fromJS } from 'immutable';

import { PRODUCT_TYPES } from '../../types/Product';
import { APP_SELECT_AGENT } from '../actions/App';

type State = Immutable.Map<string, any>

// combine action types
export type Action = LocationLoadRequestAction
  | LocationLoadSuccessAction
  | LocationLoadFailAction
  | Redux.Action

export interface LocationStateProps extends ProductStateProps {
  lastFetchTs: number,
}

// interface State extends Immutable.Map<string, any> {
//   isFetching: boolean,
//   lastFetchTs: number,
//   error: Error | null,
//   data: LocationData[],
// }

const initialJSState: ProductStateProps = Object.assign(stdProductReducer.initialJSState, {
  lastFetchTs: 0,
})

export const initialState: State = fromJS(initialJSState);

// export const initialState: State = fromJS({
//   isFetching: false,
//   lastFetchTs: 0,
//   error: null,
//   data: null,
// })

function Location(state: State = initialState, action: Action) {
  switch (action.type) {
    // case LOAD_LOCATION_REQUEST: {
    //   return state
    //     .set('isFetching', true)
    // }
    // case LOAD_LOCATION_SUCCESS: {
    //   return state
    //     .set('isFetching', false)
    //     .set('error', null)
    //     .set('productData', fromJS((<LocationLoadSuccessAction> action).data))
    // }
    // case LOAD_LOCATION_FAIL: {
    //   return state
    //     .set('isFetching', false)
    //     .set('error', (action as LocationLoadFailAction).error)
    //     .set('productData', null)
    // }

    case APP_SELECT_AGENT:
      return initialState;

    default:

      if ('productType' in action && (action as ProdActions.ProductAction).productType === PRODUCT_TYPES.LOCATION) {
        // switch (action.type) {
        //   case ProdActions.PRODUCT_LOAD_REQUEST:
        //     // state = state
        //     //   .set('filter', 'DateAsc')
        //     break;
        //   case ProdActions.PRODUCT_LOAD_SUCCESS:
        //     break;
        //   // case ProdActions.PRODUCT_LOAD_FAIL:
        //   //   break;
        //   default:
        //     break;
        // }

        return stdImmutableUpdateData(['productData'], (action as ProdActions.ProductAction), state);
      }

      return state;
  }
}

export default Location
