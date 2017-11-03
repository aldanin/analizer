import * as Redux from 'redux'
import { AccountItem, ConflictingPassword } from '../../types/Accounts';
import { TagData, TagId } from '../../types/Tag';
import { FiltersData } from '../../types/Filters'

export interface AccountsLoadRequestAction extends Redux.Action {
  nextPageNumber: number;
  agentId?: number;
  lastId: number;
  filters: FiltersData;
  pageSize: number;
}

export interface AccountsLoadSuccessAction extends Redux.Action {
  payload: {
    accountItemsData: AccountItem[];
    nextPageNumber: number;
    totalCount: number;
    filters?: FiltersData; // Return the filters object as sent in the AccountItemsLoadRequestAction for the next round
  }
}

export interface AccountsLoadFailAction extends Redux.Action {
  error: Error,
}

export interface AccountsTagFailAction extends Redux.Action {
  error: Error,
}
export interface AccountsStarFailAction extends Redux.Action {
  error: Error,
}

export interface SetFavoriteStateAction extends Redux.Action {
  payload: {
    agentId: number;
    id: number;
    isFavorite: boolean;
  }
}

export interface TagAction extends Redux.Action {
  payload: {
    agentId: number;
    accountItemId: number;
    tagId: TagId;
    tag?: TagData; // will be used when creating or modifying a tag. Not needed when removed
  }
}

export interface AccountsFiltersProps {
  agentId: number;
}

export interface AccountsReadStatusFailAction extends Redux.Action {
  error: Error
}

export interface PasswordSelectionRequestAction extends Redux.Action {
  payload: {
    agentId: number,
    accountItemId: number,
    password: ConflictingPassword
  }
}

export interface PasswordSelectionSuccessAction extends Redux.Action {
  payload: {
    accountItem: AccountItem
  }
}
export interface PasswordSelectionFailAction extends Redux.Action {
  error: Error,
}

export const ACCOUNTS_LOAD_REQUEST = 'Accounts/LOAD_REQUEST';
export const ACCOUNTS_LOAD_SUCCESS = 'Accounts/LOAD_SUCCESS';
export const ACCOUNTS_LOAD_FAIL = 'Accounts/LOAD_FAIL';
export const ACCOUNTS_SET_FAVORITE_STATE = 'Accounts/SET_FAVORITE_STATE';
export const ACCOUNTS_FAVORITE_STATE_SET_SUCCESS = 'Accounts/FAVORITE_STATE_SET_SUCCESS';
export const ACCOUNTS_FAVORITE_STATE_SET_FAIL = 'Accounts/FAVORITE_STATE_SET_FAIL';
export const ACCOUNTS_REMOVE_TAG = 'Accounts/REMOVE_ACCOUNTS';
export const ACCOUNTS_REMOVE_TAG_SUCCESS = 'Accounts/REMOVE_ACCOUNTS_SUCCESS';
export const ACCOUNTS_REMOVE_TAG_FAIL = 'Accounts/REMOVE_ACCOUNTS_FAIL';
export const ACCOUNTS_ADD_TAG = 'Accounts/ADD_ACCOUNTS';
export const ACCOUNTS_ADD_TAG_SUCCESS = 'Accounts/ADD_ACCOUNTS_SUCCESS';
export const ACCOUNTS_ADD_TAG_FAIL = 'Accounts/ADD_ACCOUNTS_FAIL';
export const ACCOUNTS_SET_READ_STATUS = 'Accounts/SET_READ_STATUS';
export const ACCOUNTS_SET_READ_STATUS_REQUEST = 'Accounts/SET_READ_STATUS_REQUEST';
export const ACCOUNTS_SET_READ_STATUS_SUCCESS = 'Accounts/SET_READ_STATUS_SUCCESS';
export const ACCOUNTS_SET_READ_STATUS_FAIL = 'Accounts/SET_READ_STATUS_FAIL';
export const ACCOUNTS_PASSWORD_SELECTION_REQUEST = 'Accounts/PASSWORD_SELECTION_REQUEST';
export const ACCOUNTS_PASSWORD_SELECTION_SUCCESS = 'Accounts/PASSWORD_SELECTION_REQUEST_SUCCESS';
export const ACCOUNTS_PASSWORD_SELECTION_FAIL = 'Accounts/PASSWORD_SELECTION_REQUEST_FAIL';

export function accountsLoadRequest(agentId: number,
                                    nextPageNumber: number,
                                    pageSize: number,
                                    filters: FiltersData,
                                    lastId?: number): AccountsLoadRequestAction {

  return {
    type: ACCOUNTS_LOAD_REQUEST,
    agentId,
    nextPageNumber,
    pageSize,
    filters,
    lastId,
  };
}

export function accountsLoadSuccess(accountItemsData: AccountItem[],
                                    nextPageNumber: number,
                                    totalCount: number,
                                    filters?: FiltersData): AccountsLoadSuccessAction {
  return {
    type: ACCOUNTS_LOAD_SUCCESS,
    payload: {
      accountItemsData: accountItemsData,
      nextPageNumber,
      totalCount: totalCount,
      filters: filters
    }
  };
}

/**
 * Dispatched when loading the gallery fails
 */
export function accountsLoadError(error: Error): AccountsLoadFailAction {
  return {
    type: ACCOUNTS_LOAD_FAIL,
    error,
  };
}

export function accountsSetFavoriteState(agentId: number,
                                         id: number,
                                         isFavorite: boolean): SetFavoriteStateAction {
  return {
    type: ACCOUNTS_SET_FAVORITE_STATE,
    payload: {
      agentId,
      id,
      isFavorite
    }

  };
}

export function accountsFavoriteStateSetSuccess(id: number,
                                                isFavorite: boolean): SetFavoriteStateAction {
  return {
    type: ACCOUNTS_FAVORITE_STATE_SET_SUCCESS,
    payload: {
      agentId: null, // TODO add cross-view
      id: id,
      isFavorite: isFavorite,
    }
  };
}

export function removeTag(agentId: number,
                          accountItemId: number,
                          tagId: TagId): TagAction {
  return {
    type: ACCOUNTS_REMOVE_TAG,
    payload: {
      agentId,
      accountItemId,
      tagId
    }
  };
}

export function removeTagSuccess(agentId: number,
                                 accountItemId: number,
                                 tagId: TagId): TagAction {
  return {
    type: ACCOUNTS_REMOVE_TAG_SUCCESS,
    payload: {
      agentId,
      accountItemId,
      tagId
    }
  };
}

export function removeTagFail(error: Error): AccountsTagFailAction {
  return {
    type: ACCOUNTS_REMOVE_TAG_FAIL,
    error: error,
  };
}

export function addTag(agentId: number,
                       accountItemId: number,
                       tag: TagData): TagAction {
  return {
    type: ACCOUNTS_ADD_TAG,
    payload: {
      agentId,
      accountItemId,
      tagId: tag,
      tag,
    }
  };
}

export function addTagSuccess(agentId: number,
                              accountItemId: number,
                              tag: TagData): TagAction {
  return {
    type: ACCOUNTS_ADD_TAG_SUCCESS,
    payload: {
      agentId,
      accountItemId,
      tagId: tag,
      tag
    }
  };
}

export function addTagFail(error: Error): AccountsTagFailAction {
  return {
    type: ACCOUNTS_ADD_TAG_FAIL,
    error: error,
  };
}

export function passwordSelectionRequest(agentId: number,
                                         accountItemId: number,
                                         password: ConflictingPassword): PasswordSelectionRequestAction {
  return {
    type: ACCOUNTS_PASSWORD_SELECTION_REQUEST,
    payload: {
      agentId,
      accountItemId,
      password
    }
  };
}

export function passwordSelectionSuccess(accountItem: AccountItem): PasswordSelectionSuccessAction {
  return {
    type: ACCOUNTS_PASSWORD_SELECTION_SUCCESS,
    payload: {
      accountItem, // The selected password will be reflected in the this accountItem
    }
  };
}

export function passwordSelectionFAIL(error: Error): PasswordSelectionFailAction {
  return {
    type: ACCOUNTS_PASSWORD_SELECTION_FAIL,
    error,
  };
}

export interface AccountsReadStatusAction extends Redux.Action {
  ids: number[],
  isRead: boolean,
}

export function accountsSetReadStatus(ids: number[], isRead: boolean): AccountsReadStatusAction {
  return {
    type: ACCOUNTS_SET_READ_STATUS,
    ids,
    isRead
  }
}

export interface AccountsReadStatusRequestAction extends Redux.Action {
  ids: number[],
  isRead: boolean,
}
export function accountsReadStatusRequest(ids: number[], isRead: boolean): AccountsReadStatusRequestAction {
  return {
    type: ACCOUNTS_SET_READ_STATUS_REQUEST,
    ids,
    isRead
  }
}

export interface AccountsReadStatusSuccessAction extends Redux.Action {
  ids: number[],
  isRead: boolean,
}
export function accountsReadStatusSuccess(ids: number[], isRead: boolean): AccountsReadStatusSuccessAction {
  return {
    type: ACCOUNTS_SET_READ_STATUS_SUCCESS,
    ids,
    isRead
  }
}

export function notificationsReadStatusFail(error: Error): AccountsReadStatusFailAction {
  return {
    type: ACCOUNTS_SET_READ_STATUS_FAIL,
    error,
  }
}
