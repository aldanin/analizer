import * as Redux from 'redux'
import { AgentId } from '../../types/Agent';

export const LOAD_SOCIAL_NETWORKS_REQUEST = 'SocialNetworks/LOAD_REQUEST'
export const LOAD_SOCIAL_NETWORKS_SUCCESS = 'SocialNetworks/LOAD_SUCCESS'
export const LOAD_SOCIAL_NETWORKS_FAIL = 'SocialNetworks/LOAD_FAIL'

export interface SocialNetworksLoadRequestAction extends Redux.Action {
  agentId: AgentId;
}
/**
 * Load the socialnetworks, this action starts the request saga
 */
export function socialNetworksLoadRequest(agentId: AgentId): SocialNetworksLoadRequestAction {
  return {
    type: LOAD_SOCIAL_NETWORKS_REQUEST,
    agentId,
  };
}

export interface SocialNetworksLoadSuccessAction extends Redux.Action {
  timestamp: number,
}

/**
 * Dispatched when the socialnetworks are loaded by the request saga
 */
export function socialNetworksLoadSuccess(timestamp: number = Date.now()): SocialNetworksLoadSuccessAction {
  return {
    type: LOAD_SOCIAL_NETWORKS_SUCCESS,
    timestamp,
  };
}

export interface SocialNetworksLoadFailAction extends Redux.Action {
  error: Error
}

/**
 * Dispatched when loading the socialnetworks fails
 */
export function socialNetworksLoadFail(error: Error): SocialNetworksLoadFailAction {
  return {
    type: LOAD_SOCIAL_NETWORKS_FAIL,
    error,
  };
}
