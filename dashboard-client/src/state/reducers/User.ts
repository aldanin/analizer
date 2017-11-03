import * as Redux from 'redux'
import { UserData } from '../../types/Users'
import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAIL,
} from '../actions/User'

import {
  UserDataRequestAction,
  UserDataSuccessAction,
  UserDataFailAction,
} from '../actions/User'

export type Action = UserDataRequestAction | UserDataSuccessAction | UserDataFailAction | Redux.Action

interface State {
  isFetching: boolean,
  error: Error | null,
  data: UserData | null,
}

export const initialState: State = {
  isFetching: false,
  error: null,
  data: null,
}

function User(state: State = initialState, action: Action) {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: null,
      })
    case USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        data: (<UserDataSuccessAction> action).userData,
      })
    case USER_DATA_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        data: null,
        error: (<UserDataFailAction> action).error
      })
    default:
      return state
  }
}

export default User
