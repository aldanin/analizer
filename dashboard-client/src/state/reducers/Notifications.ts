import * as Redux from 'redux'
import { NotificationData, NotificationId, INITIAL_ID } from '../../types/Notifications'

import {
  LOAD_NOTIFICATIONS_REQUEST,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  NEW_NOTIFICATIONS_RECIEVED,
  SET_READ_STATUS_SUCCESS,
} from '../actions/Notifications'

import {
  NotificationsLoadRequestAction,
  NotificationsLoadSuccessAction,
  NotificationsLoadFailAction,
  NotificationsReceivedAction,
  NotificationsReadStatusSuccessAction,
} from '../actions/Notifications'

export type Action = NotificationsLoadRequestAction
  | NotificationsLoadSuccessAction
  | NotificationsLoadFailAction
  | NotificationsReadStatusSuccessAction
  | NotificationsReceivedAction
  | Redux.Action

interface State {
  isFetching: boolean,
  error: Error | null,
  lastId: NotificationId,
  countTotal: number,
  countUnread: number,
  data: Array<NotificationData>
}

export const initialState: State = {
  isFetching: false,
  error: null,
  lastId: INITIAL_ID,
  countTotal: -1,
  countUnread: -1,
  data: []
}

export function indexArray(arr: Array<any>) {
  return arr.reduce(
    (acc, val) => {
      acc[val.id] = val;
      return acc;
    },
    {}
  )
}

function User(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      })
    case LOAD_NOTIFICATIONS_SUCCESS: {
      const {notifications, countTotal, countUnread} = (<NotificationsLoadSuccessAction> action).payload
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        lastId: notifications.length > 0 ? notifications[notifications.length - 1].id : INITIAL_ID,
        data: state.data.concat(notifications),
        countTotal: countTotal,
        countUnread: state.countUnread >= 0 ? state.countUnread : countUnread,
      })
    }
    case LOAD_NOTIFICATIONS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: (<NotificationsLoadFailAction> action).error,
      })
    case NEW_NOTIFICATIONS_RECIEVED: {
      const { notifications, countTotal, countUnread } = (<NotificationsReceivedAction> action).payload
      return Object.assign({}, state, {
        lastId: state.data.length > 0 ? state.lastId : notifications[notifications.length - 1].id,
        data: notifications.concat(state.data),
        countTotal,
        countUnread: state.countUnread >= 0 ? state.countUnread + notifications.length : countUnread
      })
    }
    case SET_READ_STATUS_SUCCESS:
      const { ids, isRead } = (<NotificationsReadStatusSuccessAction> action)
      let changed = 0
      const newItems = state.data.map((item) => {
        if (ids.indexOf(item.id) >= 0 && item.isRead !== isRead) {
          changed++
          return Object.assign({}, item, {isRead})
        } else {
          return item
        }
      })
      return Object.assign({}, state, {
        countUnread: state.countUnread + (isRead ? -changed : changed),
        data: newItems
      })
    default:
      return state
  }
}

export default User
