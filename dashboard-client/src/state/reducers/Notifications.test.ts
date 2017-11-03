import * as Redux from 'redux'
import notificationsReducer from './Notifications'
import { initialState as reducerInitialState } from './Notifications'
import {
  notificationsLoadRequest,
  notificationsLoadSuccess,
  notificationsLoadFail,
  notificationsReceived,
  notificationsReadStatusSuccess,
} from '../actions/Notifications'

import { NotificationData, INITIAL_ID } from '../../types/Notifications'

it('should provide the initial state', () => {
  expect(notificationsReducer(undefined, {} as Redux.Action)).toEqual(reducerInitialState)
})

it('should handle LOAD_NOTIFICATIONS_REQUEST actions', () => {
  const state = {
    isFetching: true,
    error: null,
    lastId: '0',
    countTotal: -1,
    countUnread: -1,
    data: [],
  }

  expect(notificationsReducer(reducerInitialState, notificationsLoadRequest(INITIAL_ID, 9))).toEqual(state)
})

it('should handle LOAD_NOTIFICATIONS_SUCCESS actions', () => {
  const notifications = [
    {
      title: 'notification title',
      content: 'notification content',
      isRead: true,
      created: 1999,
      id: '123',
    }
  ] as NotificationData[],
  countTotal = 78,
  countUnread = 9

  const initialState = {
    isFetching: true,
    error: null,
    lastId: '0',
    countTotal: -1,
    countUnread: -1,
    data: [],
  }

  const resultState = {
    isFetching: false,
    error: null,
    lastId: '123',
    countTotal: 78,
    countUnread: 9,
    data: notifications,
  }

  expect(notificationsReducer(initialState,
                              notificationsLoadSuccess(notifications, countTotal, countUnread))).toEqual(resultState)
})

it('should not update countUnread if already has value', () => {
  const notifications = [
    {
      title: 'notification title',
      content: 'notification content',
      isRead: true,
      created: 1999,
      id: '123',
    }
  ] as NotificationData[]

  const initialState = {
    isFetching: true,
    error: null,
    lastId: '0',
    countTotal: 99,
    countUnread: 8,
    data: notifications,
  }

  const resultState = {
    isFetching: false,
    error: null,
    lastId: '0',
    countTotal: 77,
    countUnread: 8,
    data: notifications,
  }

  expect(notificationsReducer(initialState,
                              notificationsLoadSuccess([], 77, 5))).toEqual(resultState)
})

it('should concat new results and update lastId', () => {
  const newNotification = {
    title: 'notification 2 title',
    content: 'notification 2 content',
    isRead: false,
    created: 19990,
    id: '432',
  }

  const initialState = {
    isFetching: true,
    error: null,
    lastId: '123',
    countTotal: 99,
    countUnread: 8,
    data: [
      {
        title: 'notification title',
        content: 'notification content',
        isRead: true,
        created: 1999,
        id: '123',
      }
    ],
  }

  const resultState = {
    isFetching: false,
    error: null,
    lastId: newNotification.id,
    countTotal: 77,
    countUnread: 8,
    data: [
      {
        title: 'notification title',
        content: 'notification content',
        isRead: true,
        created: 1999,
        id: '123',
      },
      newNotification
    ],
  }

  expect(notificationsReducer(initialState,
                              notificationsLoadSuccess([newNotification], 77, 5))).toEqual(resultState)
})

it('should handle LOAD_NOTIFICATIONS_FAIL actions', () => {
  const error = new Error('Foo bar')
  const initialState = {
    isFetching: true,
    error: null,
    lastId: '0',
    countTotal: -1,
    countUnread: -1,
    data: [],
  }

  const resultState = {
    isFetching: false,
    error: error,
    lastId: '0',
    countTotal: -1,
    countUnread: -1,
    data: [],
  }
  expect(notificationsReducer(initialState, notificationsLoadFail(error))).toEqual(resultState)
})

it('should handle NEW_NOTIFICATIONS_RECIEVED actions', () => {
  const newNotifications = [
    {
      title: 'notification title',
      content: 'notification content',
      isRead: true,
      created: 1999,
      id: '124',
    }
  ] as NotificationData[],
  countTotal = 78,
  countUnread = 9

  const initialState = {
    isFetching: false,
    error: null,
    lastId: '122',
    countTotal: 198,
    countUnread: 5,
    data: [{
      title: 'old notification title',
      content: 'old notification content',
      isRead: true,
      created: 1999,
      id: '122',
    }],
  }

  const resultState = {
    isFetching: false,
    error: null,
    lastId: '122',
    countTotal: 78,
    countUnread: 6,
    data: newNotifications.concat(initialState.data),
  }

  expect(notificationsReducer(initialState,
                              notificationsReceived(newNotifications, countTotal, countUnread))).toEqual(resultState)
})

it('should handle NEW_NOTIFICATIONS_RECIEVED actions and set countUnread and lastId', () => {
  const newNotifications = [
    {
      title: 'notification title',
      content: 'notification content',
      isRead: true,
      created: 1999,
      id: '149',
    }
  ] as NotificationData[],
  countTotal = 78,
  countUnread = 9

  const resultState = {
    isFetching: false,
    error: null,
    lastId: '149',
    countTotal: 78,
    countUnread: 9,
    data: newNotifications,
  }

  expect(notificationsReducer(reducerInitialState,
                              notificationsReceived(newNotifications, countTotal, countUnread))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const initialState = {
    isFetching: true,
    error: null,
    lastId: '0',
    countTotal: -1,
    countUnread: -1,
    data: [],
  }
  expect(notificationsReducer(initialState, { type: 'unknown' })).toEqual(initialState)
})

it('should handle SET_READ_STATUS_SUCCESS actions', () => {
  const initialState = {
    isFetching: true,
    error: null,
    lastId: '432',
    countTotal: 77,
    countUnread: 5,
    data: [
      {
        title: 'notification title',
        content: 'notification content',
        isRead: true,
        created: 1999,
        id: '123',
      },
      {
        title: 'notification 2 title',
        content: 'notification 2 content',
        isRead: false,
        created: 19990,
        id: '432',
      }
    ],
  }

  const resultState1 = {
    isFetching: true,
    error: null,
    lastId: '432',
    countTotal: 77,
    countUnread: 4,
    data: [
      {
        title: 'notification title',
        content: 'notification content',
        isRead: true,
        created: 1999,
        id: '123',
      },
      {
        title: 'notification 2 title',
        content: 'notification 2 content',
        isRead: true,
        created: 19990,
        id: '432',
      }
    ],
  }

  expect(notificationsReducer(initialState, notificationsReadStatusSuccess(['432'], true))).toEqual(resultState1)

  const resultState2 = {
    isFetching: true,
    error: null,
    lastId: '432',
    countTotal: 77,
    countUnread: 6,
    data: [
      {
        title: 'notification title',
        content: 'notification content',
        isRead: false,
        created: 1999,
        id: '123',
      },
      {
        title: 'notification 2 title',
        content: 'notification 2 content',
        isRead: false,
        created: 19990,
        id: '432',
      }
    ],
  }
  expect(
    notificationsReducer(initialState, notificationsReadStatusSuccess(['123', '432'], false))
  ).toEqual(resultState2)
})
