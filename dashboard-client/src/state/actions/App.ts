import * as Redux from 'redux'
import { AgentUnreadProducts } from '../../types/Agent';

export const APP_SELECT_AGENT = 'App/SELECT_AGENT';
export const APP_NAV_MENU_REQUEST = 'App/NAV_MENU_REQUEST';
export const APP_NAV_MENU_SUCCESS = 'App/NAV_MENU_LOAD_SUCCESS';
export const APP_NAV_MENU_ERROR = 'App/NAV_MENU_LOAD_ERROR';
export const APP_PAGE_NAVIGATE = 'App/PAGE_NAVIGATE';

export interface AgentSelectionAction extends Redux.Action {
  payload: AgentSelectionProps;
}

export interface AgentSelectionProps {
  agentId: number;
}
/**
 * Save the agent, this action save agent id in the store for url navigation
 */
export function agentSelected(payload: AgentSelectionProps): AgentSelectionAction {
  return {
    type: APP_SELECT_AGENT,
    payload,
  };
}

export interface NavMenuLoadRequestAction extends Redux.Action {
  payload: NavMenuLoadRequestProps;
}

export interface NavMenuLoadRequestProps {
  agentId: number;
}
/**
 * calls after agent selected
 */
export function navMenuLoadRequest(payload: NavMenuLoadRequestProps): NavMenuLoadRequestAction {
  return {
    type: APP_NAV_MENU_REQUEST,
    payload,
  };
}

export interface NavMenuLoadSuccessAction extends Redux.Action {
  payload: NavMenuLoadSuccessProps;
}

export interface NavMenuLoadSuccessProps {
  data: AgentUnreadProducts;
}
/**
 * calls if agent nav menu data load successfully
 */
export function navMenuLoadSuccess(payload: NavMenuLoadSuccessProps): NavMenuLoadSuccessAction {
  return {
    type: APP_NAV_MENU_SUCCESS,
    payload,
  };
}

export interface NavMenuLoadErrorAction extends Redux.Action {
  payload: NavMenuLoadErrorProps;
}

export interface NavMenuLoadErrorProps {
  error: Error;
}
/**
 * calls if agent nav menu data load with error
 */
export function navMenuLoadError(payload: NavMenuLoadErrorProps): NavMenuLoadErrorAction {
  return {
    type: APP_NAV_MENU_ERROR,
    payload,
  };
}

export interface PageNavigateAction extends Redux.Action {
  payload: PageNavigateProps;
}

export interface PageNavigateProps {
  page: string;
}
/**
 * calls when user redirect to another page
 */
export function pageNavigate(payload: PageNavigateProps): PageNavigateAction {
  return {
    type: APP_PAGE_NAVIGATE,
    payload,
  };
}
