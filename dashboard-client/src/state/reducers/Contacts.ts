import * as Redux from 'redux'
import { fromJS } from 'immutable'
import * as Immutable from 'immutable'
import * as Actions from '../actions/Contacts'
import { PRODUCT_TYPES } from '../../types/Product';
import * as Contacts from '../../types/Contacts'
import { ProductAction } from '../actions/ProductActions';
import * as stdProductReducer from './StdProductActionsImmutable'
import { ProductStateProps } from '../interfaces'
import { stdImmutableUpdateData } from './StdProductActionsImmutable';
import { APP_SELECT_AGENT } from '../actions/App';

type State = Immutable.Map<string, any>

export type Action = Redux.Action

const initialJSState: ProductStateProps = Object.assign(stdProductReducer.initialJSState, {
  filters: Contacts.DEFAULT_FILTERS,
})

export const initialState: State = fromJS(initialJSState);

function contactsReducer(state: State = initialState, action: Action) {

  switch (action.type) {
    case Actions.CONTACTS_FILTERS_CHANGE:
      const filters = (<Actions.FiltersChangeActionProps> action).payload.filters;

      return state
        .set('action', action.type)
        .set('filters', Immutable.fromJS(filters));

    case APP_SELECT_AGENT:
      return initialState;

    default:
      break;
  }

  if ('productType' in action && (action as ProductAction).productType === PRODUCT_TYPES.CONTACTS) {
    return stdImmutableUpdateData(['productData'], (action as ProductAction), state);
  }

  return state;
}

export default contactsReducer;
