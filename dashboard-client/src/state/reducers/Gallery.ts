import * as Immutable from 'immutable'
import { fromJS } from 'immutable'
import * as Actions from '../actions/Gallery'
import * as ProdActions from '../actions/ProductActions'

import { PRODUCT_TYPES } from '../../types/Product';
import { ProductStateProps } from '../interfaces';
import * as stdProductReducer from './StdProductActionsImmutable'
import { stdImmutableUpdateData } from './StdProductActionsImmutable';
import * as Agent from '../../types/Agent'
import { APP_SELECT_AGENT } from '../actions/App';

// The initial state of the App
type State = Immutable.Map<string, any>

export interface GalleryStateProps extends ProductStateProps {
  agent_id: Agent.AgentId,
  filter: any,
}

export type Action =
  Actions.ImageOptionAction |
  Actions.SortOptionAction

const initialJSState: ProductStateProps = Object.assign(stdProductReducer.initialJSState, {
  filter: 'DateAsc',
})

export const initialState: State = fromJS(initialJSState);

function galleryReducer(state: State = initialState, action: Action) {

  switch (action.type) {
    case Actions.GALLERY_SORT_DATA:
      let filter = (action as Actions.SortOptionAction).sortFilter;
      return state
        .set('isFetching', true)
        .set('error', false)
        .set('filter', filter)
        .set('productData', Immutable.Map());

    case APP_SELECT_AGENT:
      return initialState;

    default:
  }

  if ('productType' in action && (action as ProdActions.ProductAction).productType === PRODUCT_TYPES.GALLERY) {
    switch (action.type) {
      case ProdActions.PRODUCT_LOAD_REQUEST:
        state = state
          .set('filter', 'DateAsc')
        break;
      default:
        break;
    }

    return stdImmutableUpdateData(['productData'], (action as ProdActions.ProductAction), state);
  }

  return state;
}

export default galleryReducer;
