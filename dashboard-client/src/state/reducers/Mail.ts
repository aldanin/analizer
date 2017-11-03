import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS } from 'immutable'

import {
  LOAD_MAIL_REQUEST,
  LOAD_MAIL_SUCCESS,
  LOAD_MAIL_FAIL, MailLoadSuccessAction, MailLoadFailAction, MAIL_UPDATE_ACCOUNT, UpdateAccountIdAction,
} from '../actions/Mail'
import { MailAppData } from '../../types/Mail';
import { ProductAction } from '../actions/ProductActions';
import { PRODUCT_TYPES } from '../../types/Product';
import { stdImmutableUpdateData } from './StdProductActionsImmutable';
import { APP_SELECT_AGENT } from '../actions/App';

// combine action types
export type Action = | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
  data: MailAppData;
  accountId: string;
}

export const initialState: State = fromJS({
  isFetching: true,
  lastFetchTs: 0,
  error: null,
  data: null,
  accountId: null,
})

function mail(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_MAIL_REQUEST: {
      return state
        .set('isFetching', true)
        .set('isFirstLoading', true)
    }
    case LOAD_MAIL_SUCCESS: {
      const {timestamp} = (<MailLoadSuccessAction> action)
      let result = null;
      if ((action as MailLoadSuccessAction).data.accounts.length > 0) {
        result = (action as MailLoadSuccessAction).data.accounts[0].id;
      }
      return state
        .set('data', fromJS((action as MailLoadSuccessAction).data))
        .set('accountId', result)
        .set('isFetching', false)
        .set('lastFetchTs', timestamp)
        .set('isFirstLoading', false)
        .set('error', null)
    }
    case LOAD_MAIL_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', (action as MailLoadFailAction).error)
    }

    case MAIL_UPDATE_ACCOUNT: {
      return state
        .set('accountId', (action as UpdateAccountIdAction).accountId);
    }

    case APP_SELECT_AGENT:
      return initialState;

    default:
  }
  // LISTENER TO PRODUCT (GLOBAL) ACTIONS:
  if ('productType' in action && (action as ProductAction).productType === PRODUCT_TYPES.MAIL) {
    let index = 0;
    state.getIn(['data', 'accounts']).findIndex((account, idx) => {
      if (account.get('id') === state.get('accountId')) {
        index = idx;
      }
    });

    return stdImmutableUpdateData(['data', 'accounts', index + '', 'inbox'], (action as ProductAction), state);

  }
  return state;
}

export default mail;
