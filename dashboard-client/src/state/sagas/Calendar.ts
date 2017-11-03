import { call, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_CALENDAR_REQUEST,
  CalendarLoadRequestAction,
  calendarLoadSuccess,
  calendarLoadFail, CALENDAR_CHANGE_DATE, CalendarChangeDateAction
} from '../actions/Calendar'

// TODO: handle load requests
const demoData = {
  accounts: [{
    id: 0,
    calendar: [{
      id: 0,
      title: 'Lunch with Team',
      location: {
        place: 'Meet&Wine',
        city: 'Chicago',
        street: 'Michigan Ave',
        number:  12,
      },
      description: 'Discussing all problematic issues',
      organizer: 'davidl@gmail.com',
      creationDate: 1494828201000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [{
        id: 0,
        name: 'Brief',
        type: 'pdf',
      }],
      lastAppear: 1494828296000,
      fromTime: 1495099800000,
      toTime: 1495107000000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: true,
      tags: [],
    }, {
      id: 1,
      title: 'Vacation',
      location: {
        place: '',
        city: '',
        street: '',
        number:  0,
      },
      description: 'My vacation',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828940000,
      participants: [],
      attachments: [],
      lastAppear: 1494828970000,
      fromTime: 1495179600000,
      toTime: 1495430400000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: true,
      isNew: false,
      tags: [],
    }, {
      id: 2,
      title: 'Test',
      location: {
        place: '',
        city: '',
        street: '',
        number:  0,
      },
      description: 'Test #1',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828940000,
      participants: [],
      attachments: [],
      lastAppear: 1494828970000,
      fromTime: 1495566900000,
      toTime: 1495597200000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: false,

      tags: [],
    }],
    account: 'BenJ@gmail.com',
    isActive: true,
  }, {
    id: 1,
    calendar: [{
      id: 3,
      title: 'Daily planning office',
      location: {
        place: 'Office',
        city: 'Chicago',
        street: 'Michigan Ave',
        number:  18,
      },
      description: 'planning schedule',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828763000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [],
      lastAppear: 1494828776000,
      fromTime: 1494921600000,
      toTime: 1494925200000,
      isNotebook: false,
      isFavorite: true,
      isFullDay: false,
      isNew: false,
      tags: [{
        id: '0',
        text: 'Home'
      }, {
        id: '1',
        text: 'Terror'
      }, {
        id: '2',
        text: 'Work'
      }, {
        id: '3',
        text: 'Family'
      }, ],
    }, {
      id: 4,
      title: 'Lunch with Team',
      location: {
        place: 'Meet&Wine',
        city: 'Chicago',
        street: 'Michigan Ave',
        number:  12,
      },
      description: 'Discussing all problematic issues',
      organizer: 'davidl@gmail.com',
      creationDate: 1494828201000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [{
        id: 0,
        name: 'Brief',
        type: 'pdf',
      }],
      lastAppear: 1494828296000,
      fromTime: 1495099800000,
      toTime: 1495107000000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: true,
      tags: [],
    }, {
      id: 5,
      title: 'Test',
      location: {
        place: '',
        city: '',
        street: '',
        number:  0,
      },
      description: 'Test #1',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828940000,
      participants: [],
      attachments: [],
      lastAppear: 1494828970000,
      fromTime: 1495566000000,
      toTime: 1495594800000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: false,

      tags: [],
    } ],
    account: 'BenJones@gmail.com',
    isActive: true,
  }, {
    id: 2,
    calendar: [{
      id: 6,
      title: 'Brainstorming',
      location: {
        place: 'Meet&Wine',
        city: 'Chicago',
        street: 'Michigan Ave',
        number:  12,
      },
      description: 'Discussing about Brainstorming',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828484000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [],
      lastAppear: 1494828524000,
      fromTime: 1495103400000,
      toTime: 1495110600000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: false,
      tags: [],
    }, {
      id: 7,
      title: 'Vacation',
      location: {
        place: '',
        city: '',
        street: '',
        number:  0,
      },
      description: 'My vacation',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828940000,
      participants: [],
      attachments: [],
      lastAppear: 1494828970000,
      fromTime: 1495173600000,
      toTime: 1495310400000,
      isNotebook: false,
      isFavorite: true,
      isFullDay: true,
      isNew: true,
      tags: [{
        id: '0',
        text: 'Family',
      }],
    }, {
      id: 8,
      title: 'Test',
      location: {
        place: '',
        city: '',
        street: '',
        number:  0,
      },
      description: 'Test #1',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828940000,
      participants: [],
      attachments: [],
      lastAppear: 1494828970000,
      fromTime: 1495566000000,
      toTime: 1495594800000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: false,

      tags: [],
    }],
    account: 'JonesJones@gmail.com',
    isActive: true,
  }, {
    id: 3,
    calendar: [{
      id: 9,
      title: 'Daily planning office',
      location: {
        place: 'Office',
        city: 'Chicago',
        street: 'Michigan Ave',
        number: 18,
      },
      description: 'planning schedule',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828763000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [],
      lastAppear: 1494828776000,
      fromTime: 1494921600000,
      toTime: 1494925200000,
      isNotebook: false,
      isFavorite: true,
      isFullDay: false,
      isNew: false,
      tags: [],
    }, {
      id: 10,
      title: 'Lunch with Team',
      location: {
        place: 'Meet&Wine',
        city: 'Chicago',
        street: 'Michigan Ave',
        number:  12,
      },
      description: 'Discussing all problematic issues',
      organizer: 'davidl@gmail.com',
      creationDate: 1494828201000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [{
        id: 0,
        name: 'Brief',
        type: 'pdf',
      }],
      lastAppear: 1494828296000,
      fromTime: 1495099800000,
      toTime: 1495107000000,
      isNotebook: false,
      isFavorite: false,
      isFullDay: false,
      isNew: true,
      tags: [],
    }, ],
    account: 'BenJones2@gmail.com',
    isActive: true,
  }, {
    id: 4,
    calendar: [{
      id: 11,
      title: 'Daily planning office',
      location: {
        place: 'Office',
        city: 'Chicago',
        street: 'Michigan Ave',
        number: 18,
      },
      description: 'planning schedule',
      organizer: 'chucki@gmail.com',
      creationDate: 1494828763000,
      participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
      attachments: [],
      lastAppear: 1494828776000,
      fromTime: 1494921600000,
      toTime: 1494925200000,
      isNotebook: false,
      isFavorite: true,
      isFullDay: false,
      isNew: false,
      tags: [],
    }],
    account: 'BenJones3@gmail.com',
    isActive: true,
  }]
}

export function apiFetchCalendar() {
  const data = demoData
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(data) },
      1500)
  })
}

export function* fetchCalendar(action: CalendarLoadRequestAction) {
  try {
    const data = yield call(apiFetchCalendar)
    yield put(calendarLoadSuccess(data))
  } catch (error) {
    yield put(calendarLoadFail(error))
  }
}

export function* fetchNewDate(action: CalendarChangeDateAction) {
  try {
    const data = yield call(apiFetchCalendar)
    yield put(calendarLoadSuccess(data))
  } catch (error) {
    yield put(calendarLoadFail(error))
  }
}

export function* watchCalendar() {
  yield takeEvery(LOAD_CALENDAR_REQUEST, fetchCalendar)
  yield takeEvery(CALENDAR_CHANGE_DATE, fetchNewDate)
}
