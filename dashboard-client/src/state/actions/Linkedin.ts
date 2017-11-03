import * as Redux from 'redux'
import { AgentId } from '../../types/Agent';
import { LinkedinData, TwitterId } from '../../types/SocialNetworks';
import { TagId } from '../../types/Tag';

export const LOAD_LINKEDIN_REQUEST = 'SocialNetworks/Linkedin/LOAD_REQUEST';
export const LOAD_LINKEDIN_FAIL = 'SocialNetworks/Linkedin/LOAD_FAIL';
export const LOAD_LINKEDIN_SUCCESS = 'SocialNetworks/Linkedin/LOAD_SUCCESS';
export const LINKEDIN_SORT_BY = 'SocialNetworks/Linkedin/SORT_BY';
export const LINKEDIN_SET_STAR = 'SocialNetworks/Linkedin/SET_STAR';
export const LINKEDIN_REMOVE_TAG = 'SocialNetworks/Linkedin/REMOVE_TAG';

export interface LinkedinLoadRequestAction extends Redux.Action {
  agentId: AgentId;
}

/**
 * Load the Linkedin view, this action starts the request saga
 */
export function linkedinLoadRequest(agentId: AgentId): LinkedinLoadRequestAction {
  return {
    type: LOAD_LINKEDIN_REQUEST,
    agentId,
  };
}

export interface LinkedinLoadSuccessAction extends Redux.Action {
  payload: LinkedinData,
}

/**
 * Dispatched when the socialnetworks are loaded by the request saga
 */
export function linkedinLoadSuccess(payload: LinkedinData) {
  return {
    type: LOAD_LINKEDIN_SUCCESS,
    payload,
  };
}

export interface LinkedinLoadFailAction extends Redux.Action {
  error: Error
}

/**
 * Dispatched when loading the socialnetworks fails
 */
export function linkedinLoadFail(error: Error): LinkedinLoadFailAction {
  return {
    type: LOAD_LINKEDIN_FAIL,
    error,
  };
}

export interface LinkedinSortByAction extends Redux.Action {
  payload: LinkedinSortByProps;
}

export interface LinkedinSortByProps {
  selectedIndex: number;
}

/**
 * Dispatched when user change sort of linkedin connection
 */
export function linkedinSortBy(payload: LinkedinSortByProps): LinkedinSortByAction {
  return {
    type: LINKEDIN_SORT_BY,
    payload,
  };
}

export interface LinkedinSetStarAction extends Redux.Action {
  payload: LinkedinSetStarProps;
}

export interface LinkedinSetStarProps {
  path: string[];
  id: TwitterId;
  isFavorite: boolean;
}

/**
 * Dispatched when user click on star icon
 */
export function linkedinSetStar(payload: LinkedinSetStarProps): LinkedinSetStarAction {
  return {
    type: LINKEDIN_SET_STAR,
    payload,
  };
}

export interface LinkedinRemoveTagAction extends Redux.Action {
  payload: LinkedinRemoveTagProps;
}

export interface LinkedinRemoveTagProps {
  path: string[];
  id: TwitterId // Twitter and Linkedin will be same type of id
  tagId: TagId;
}

/**
 * Dispatched when user click on x inside tag
 */
export function linkedinRemoveTag(payload: LinkedinRemoveTagProps): LinkedinRemoveTagAction {
  return {
    type: LINKEDIN_REMOVE_TAG,
    payload,
  };
}
