import * as Redux from 'redux'
import { AgentId } from '../../types/Agent';
import { MailAppData } from '../../types/Mail';

export const LOAD_MAIL_REQUEST = 'Mail/LOAD_REQUEST';
export const LOAD_MAIL_SUCCESS = 'Mail/LOAD_SUCCESS';
export const LOAD_MAIL_FAIL = 'Mail/LOAD_FAIL';
export const MAIL_UPDATE_ACCOUNT = 'Mail/UPDATE_ACCOUNT';

export interface MailLoadRequestAction extends Redux.Action {
  agentId: AgentId;
}
/**
 * Load the mail view, this action starts the request saga
 */
export function mailLoadRequest(agentId: AgentId): MailLoadRequestAction {
  return {
    type: LOAD_MAIL_REQUEST,
    agentId,
  };
}

export interface MailLoadSuccessAction extends Redux.Action {
  timestamp: number,
  data: MailAppData,
}

/**
 * Dispatched when the mail are loaded by the request saga
 */
export function mailLoadSuccess(data: MailAppData, timestamp: number = Date.now()): MailLoadSuccessAction {
  return {
    type: LOAD_MAIL_SUCCESS,
    timestamp,
    data,
  };
}

export interface MailLoadFailAction extends Redux.Action {
  error: Error
}

/**
 * Dispatched when loading the mail fails
 */
export function mailLoadFail(error: Error): MailLoadFailAction {
  return {
    type: LOAD_MAIL_FAIL,
    error,
  };
}

export interface UpdateAccountIdAction extends Redux.Action  {
  accountId: string;
}

/**
 * Dispatched when user chose account inbox
 */
export function updateAccountId(accountId: string): UpdateAccountIdAction {
  return {
    type: MAIL_UPDATE_ACCOUNT,
    accountId,
  };
}
