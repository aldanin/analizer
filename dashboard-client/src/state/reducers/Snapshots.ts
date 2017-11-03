import { fromJS }  from 'immutable'
import * as Immutable from 'immutable'
import { ProductStateProps } from '../interfaces';
// import * as Agent from '../../types/Agent'
import * as stdProductReducer from './StdProductActionsImmutable'
import * as ProdActions from '../actions/ProductActions'

import { PRODUCT_TYPES } from '../../types/Product';
import { stdImmutableUpdateData } from './StdProductActionsImmutable';
import { APP_SELECT_AGENT } from '../actions/App';

type State = Immutable.Map<string, any>

const initialJSState: ProductStateProps = Object.assign(stdProductReducer.initialJSState, {
  lastFetchTs: 0,
})

export const initialState: State = fromJS(initialJSState);

function Snapshots(state: State = initialState, action: ProdActions.ProductAction) {

  switch (action.type) {
    case APP_SELECT_AGENT:
      return initialState;
    default:
      break;
  }

  if ('productType' in action && (action as ProdActions.ProductAction).productType === PRODUCT_TYPES.SNAPSHOTS) {

    return stdImmutableUpdateData(['productData'], (action as ProdActions.ProductAction), state);
  }

  return state;
}

export default Snapshots
