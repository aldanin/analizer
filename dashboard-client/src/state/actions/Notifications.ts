import * as Redux from 'redux'
import { NotificationData, NotificationId } from '../../types/Notifications'

export const LOAD_NOTIFICATIONS_REQUEST = 'Notifications/LOAD_REQUEST'
export const LOAD_NOTIFICATIONS_SUCCESS = 'Notifications/LOAD_SUCCESS'
export const LOAD_NOTIFICATIONS_FAIL = 'Notifications/LOAD_FAIL'

export const NEW_NOTIFICATIONS_RECIEVED = 'Notifications/NEW_RECEIVED'

export const SET_READ_STATUS = 'Notification/SET_READ_STATUS'
export const SET_READ_STATUS_REQUEST = 'Notification/SET_READ_STATUS_REQUEST'
export const SET_READ_STATUS_SUCCESS = 'Notification/SET_READ_STATUS_SUCCESS'
export const SET_READ_STATUS_FAIL = 'Notification/SET_READ_STATUS_FAIL'

export interface NotificationsLoadRequestAction extends Redux.Action {
  lastId: NotificationId,
  count: number,
}
/**
 * Load the agents, this action starts the request saga
 */
export function notificationsLoadRequest(lastId: NotificationId, count: number): NotificationsLoadRequestAction {
  return {
    type: LOAD_NOTIFICATIONS_REQUEST,
    lastId,
    count,
  };
}

export interface NotificationsLoadSuccessAction extends Redux.Action {
  payload: {
    notifications: NotificationData[],
    countTotal: number,
    countUnread: number,
  }
}
/**
 * Dispatched when the agents are loaded by the request saga
 */
export function notificationsLoadSuccess(
  notifications: Array<NotificationData>, countTotal: number, countUnread: number): NotificationsLoadSuccessAction {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    payload: {
      notifications,
      countTotal,
      countUnread,
    }
  };
}

export interface NotificationsLoadFailAction extends Redux.Action {
  error: Error,
}
/**
 * Dispatched when loading the agents fails
 */
export function notificationsLoadFail(error: Error): NotificationsLoadFailAction {
  return {
    type: LOAD_NOTIFICATIONS_FAIL,
    error,
  };
}

export interface NotificationsReceivedAction extends Redux.Action {
  payload: {
    notifications: NotificationData[],
    countTotal: number,
    countUnread: number,
  }
}
/**
 * Dispatched when new notifications are pushed from the server
 */
export function notificationsReceived(
  notifications: Array<NotificationData>, countTotal: number, countUnread: number): NotificationsReceivedAction {
  return {
    type: NEW_NOTIFICATIONS_RECIEVED,
    payload: {
      notifications,
      countTotal,
      countUnread,
    }
  };
}

// ------------
// Read status
// ------------

export interface NotificationsReadStatusAction extends Redux.Action {
  ids: NotificationId[],
  isRead: boolean,
}
export function notificationsSetReadStatus(ids: NotificationId[], isRead: boolean): NotificationsReadStatusAction {
  return {
    type: SET_READ_STATUS,
    ids,
    isRead
  }
}

export interface NotificationsReadStatusRequestAction extends Redux.Action {
  ids: NotificationId[],
  isRead: boolean,
}
export function notificationsReadStatusRequest(ids: NotificationId[], isRead: boolean):
  NotificationsReadStatusRequestAction {
  return {
    type: SET_READ_STATUS_REQUEST,
    ids,
    isRead
  }
}

export interface NotificationsReadStatusSuccessAction extends Redux.Action {
  ids: NotificationId[],
  isRead: boolean,
}
export function notificationsReadStatusSuccess(ids: NotificationId[], isRead: boolean):
  NotificationsReadStatusSuccessAction {
  return {
    type: SET_READ_STATUS_SUCCESS,
    ids,
    isRead
  }
}

export interface NotificationsReadStatusFailAction extends Redux.Action {
  error: Error
}
export function notificationsReadStatusFail(error: Error): NotificationsReadStatusFailAction {
  return {
    type: SET_READ_STATUS_FAIL,
    error,
  }
}
