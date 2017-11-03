import * as Redux from 'redux'
import { UserData } from '../../types/Users'

export const USER_DATA_REQUEST = 'User/DATA_REQUEST';
export const USER_DATA_SUCCESS = 'User/DATA_SUCCESS';
export const USER_DATA_FAIL = 'User/DATA_FAIL';

export interface UserDataRequestAction extends Redux.Action {
  userId: string;
}

export function userDataRequest(userId: string | null): UserDataRequestAction {
  return {
    type: USER_DATA_REQUEST,
    userId,
  };
}

export interface UserDataSuccessAction extends Redux.Action {
  userData: UserData;
}
export function userDataSuccess(data: UserData): UserDataSuccessAction {
  return {
    type: USER_DATA_SUCCESS,
    userData: data,
  };
}

export interface UserDataFailAction extends Redux.Action {
  error: Error
}
export function userDataFail(error: Error): UserDataFailAction {
  return {
    type: USER_DATA_FAIL,
    error,
  }
}
