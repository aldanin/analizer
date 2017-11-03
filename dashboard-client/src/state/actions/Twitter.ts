import * as Redux from 'redux'
import { AgentId } from '../../types/Agent';
import { TwitterData, TwitterId } from '../../types/SocialNetworks';
import { TagId } from '../../types/Tag';

export const LOAD_TWITTER_REQUEST = 'SocialNetworks/Twitter/LOAD_REQUEST';
export const LOAD_TWITTER_FAIL = 'SocialNetworks/Twitter/LOAD_FAIL';
export const LOAD_TWITTER_SUCCESS = 'SocialNetworks/Twitter/LOAD_SUCCESS';
export const TWITTER_SET_STAR = 'SocialNetworks/Twitter/SET_STAR';
export const TWITTER_REMOVE_TAG = 'SocialNetworks/Twitter/REMOVE_TAG';

export interface TwitterLoadRequestAction extends Redux.Action {
  agentId: AgentId;
}

/**
 * Load the Twitter view, this action starts the request saga
 */
export function twitterLoadRequest(agentId: AgentId): TwitterLoadRequestAction {
  return {
    type: LOAD_TWITTER_REQUEST,
    agentId,
  };
}

export interface TwitterLoadSuccessAction extends Redux.Action {
  payload: TwitterData,
}

/**
 * Dispatched when the socialnetworks are loaded by the request saga
 */
export function twitterLoadSuccess(payload: TwitterData) {
  return {
    type: LOAD_TWITTER_SUCCESS,
    payload,
  };
}

export interface TwitterLoadFailAction extends Redux.Action {
  error: Error
}

/**
 * Dispatched when loading the socialnetworks fails
 */
export function twitterLoadFail(error: Error): TwitterLoadFailAction {
  return {
    type: LOAD_TWITTER_FAIL,
    error,
  };
}

export interface TwitterSetStarAction extends Redux.Action {
  payload: TwitterSetStarProps;
}

export interface TwitterSetStarProps {
  path: string[];
  id: TwitterId;
  isFavorite: boolean;
}

/**
 * Dispatched when user click on star icon
 */
export function twitterSetStar(payload: TwitterSetStarProps): TwitterSetStarAction {
  return {
    type: TWITTER_SET_STAR,
    payload,
  };
}

export interface TwitterRemoveTagAction extends Redux.Action {
  payload: TwitterRemoveTagProps;
}

export interface TwitterRemoveTagProps {
  path: string[];
  id: TwitterId // Twitter and Linkedin will be same type of id
  tagId: TagId;
}

/**
 * Dispatched when user click on x inside tag
 */
export function twitterRemoveTag(payload: TwitterRemoveTagProps): TwitterRemoveTagAction {
  return {
    type: TWITTER_REMOVE_TAG,
    payload,
  };
}
