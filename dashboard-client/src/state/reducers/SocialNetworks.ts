import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS } from 'immutable'

import {
  LOAD_SOCIAL_NETWORKS_REQUEST,
  LOAD_SOCIAL_NETWORKS_SUCCESS,
  LOAD_SOCIAL_NETWORKS_FAIL,
} from '../actions/SocialNetworks'

import {
  SocialNetworksLoadRequestAction,
  SocialNetworksLoadSuccessAction,
  SocialNetworksLoadFailAction,
} from '../actions/SocialNetworks'

// combine action types
export type Action = SocialNetworksLoadRequestAction
  | SocialNetworksLoadSuccessAction
  | SocialNetworksLoadFailAction
  | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
}

export const initialState: State = fromJS({
  isFetching: true,
  lastFetchTs: 0,
  error: null,
})

function SocialNetworks(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_SOCIAL_NETWORKS_REQUEST: {
      return state
        .set('isFetching', true)
    }
    case LOAD_SOCIAL_NETWORKS_SUCCESS: {
      const {timestamp} = (<SocialNetworksLoadSuccessAction> action)
      return state
        .set('isFetching', false)
        .set('lastFetchTs', timestamp)
        .set('error', null)
    }
    case LOAD_SOCIAL_NETWORKS_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', (action as SocialNetworksLoadFailAction).error)
    }

    default: {
      return state;
    }
  }
}

export default SocialNetworks;
