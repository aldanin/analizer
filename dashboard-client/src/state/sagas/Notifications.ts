import { call, put, takeEvery, } from 'redux-saga/effects'

import {
  LOAD_NOTIFICATIONS_REQUEST,
  NotificationsLoadRequestAction,
  notificationsLoadSuccess,
  notificationsLoadFail,
  SET_READ_STATUS,
  NotificationsReadStatusAction,
  notificationsReadStatusRequest,
  notificationsReadStatusSuccess,
  notificationsReadStatusFail,
 } from '../actions/Notifications'

import { NotificationId } from '../../types/Notifications'

// TODO: handle load requests
const demoData = [{
      title: 'Translation Available',
      content: '<strong>War and peace</strong> was translated and is available',
      isRead: false,
      created: Date.now(),
      id: '1',
    },
    {
      title: 'Miri shared a notebook item with you',
      content: 'Miri Aloni shared an <i>item by Ghingis Khan</i> and tagged it #Funny',
      isRead: false,
      created: Date.now() - 68000,
      id: '2',
    },
    {
      title: 'Something cool happened successfully',
      content: 'While you were gone, really cool stuffs have happenned',
      isRead: false,
      created: Date.now() - 345000,
      id: '3',
    },
    {
      title: 'Jason commented on a Notebook item',
      content: 'Jason Williams commented on an <strong>item you wrote</strong> yesterday',
      isRead: false,
      created: Date.now() - 4450000,
      id: '4',
    },
    {
      title: 'Lorem Ipsum Dolor sit Amet',
      content: 'jhg jhg jhg jhg khjg khjg hjg khjgkuygkjhv hjg',
      isRead: false,
      created: Date.now() - 6450000,
      id: '5',
    }]

export function apiFetchNotifications(lastId: NotificationId, count: number) {
  const data = demoData.map((item, idx) => {
    return Object.assign({}, item, {id: (idx + 1 + parseInt(lastId, 10))}, {isRead: lastId !== '0'} )
  })
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve({
          data,
          countTotal: 99,
          countUnread: demoData.length,
        })
      },
      500)
  })
}

export function* fetchNotifications(action: NotificationsLoadRequestAction) {
  const { lastId, count } = action
  try {
    const { data, countTotal, countUnread } = yield call(apiFetchNotifications, lastId, count)
    yield put(notificationsLoadSuccess(data, countTotal, countUnread))
  } catch (error) {
    yield put(notificationsLoadFail(error))
  }
}

export function* watchNotifications() {
  yield takeEvery(LOAD_NOTIFICATIONS_REQUEST, fetchNotifications)
}

// TODO: handle read status changes
export function ApiUpdateReadStatus(ids: NotificationId[], isRead: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve()
      },
      300)
  })
}

export function* updateReadStatus(action: NotificationsReadStatusAction) {
  const { ids, isRead } = action
  try {
    yield put(notificationsReadStatusRequest(ids, isRead))
    yield call(ApiUpdateReadStatus, ids, isRead)
    yield put(notificationsReadStatusSuccess(ids, isRead))
  } catch (error) {
    yield put(notificationsReadStatusFail(error))
  }
}

export function* watchNotificationReads() {
  yield takeEvery(SET_READ_STATUS, updateReadStatus)
  // while (true) {
  //   const action = yield take(SET_READ_STATUS)
  //   yield call(updateReadStatus, action)
  // }
}

// TODO: handle push of new notifications
