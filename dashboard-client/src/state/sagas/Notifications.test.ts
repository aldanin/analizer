import { call, put, takeEvery } from 'redux-saga/effects'

import {
  fetchNotifications,
  watchNotifications,
  apiFetchNotifications,
  watchNotificationReads,
  ApiUpdateReadStatus,
  updateReadStatus,
} from './Notifications'

import {
  LOAD_NOTIFICATIONS_REQUEST,
  notificationsLoadRequest,
  notificationsLoadSuccess,
  notificationsLoadFail,
  SET_READ_STATUS,
  notificationsSetReadStatus,
  notificationsReadStatusRequest,
  notificationsReadStatusSuccess,
  notificationsReadStatusFail,
} from '../actions/Notifications'

it('should do fake data fetching', () => {
  const action = notificationsLoadRequest('123', 9)
  const generator = fetchNotifications(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchNotifications, '123', 9)
  );

  // check dispatching of result
  const demoData = []

  expect(
    generator.next({data: demoData, countTotal: 22, countUnread: 2}).value
  ).toEqual(
    put(notificationsLoadSuccess(demoData, 22, 2))
  );
})

it('should put notificationsLoadFail on fetch fail', () => {
  const action = notificationsLoadRequest('234', 7)
  const generator = fetchNotifications(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(notificationsLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchNotifications();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_NOTIFICATIONS_REQUEST, fetchNotifications)
  );
})

// read status actions

it('should call api as requested', () => {
  const action = notificationsSetReadStatus(['123'], true)
  const generator = updateReadStatus(action);

  // check dispatching of request
  expect(
    generator.next().value
  ).toEqual(
    put(notificationsReadStatusRequest(['123'], true))
  );

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(ApiUpdateReadStatus, ['123'], true)
  );

  // check dispatching of result
  expect(
    generator.next().value
  ).toEqual(
    put(notificationsReadStatusSuccess(['123'], true))
  );
})

it('should put notificationsLoadFail on fetch fail', () => {
  const action = notificationsSetReadStatus(['123'], true)
  const generator = updateReadStatus(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(notificationsReadStatusFail(error))
  )
})

it('should watch notifications read status update action', () => {
  const generator = watchNotificationReads();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(SET_READ_STATUS, updateReadStatus)
  );
})
