import { call, put, takeEvery, PutEffect } from 'redux-saga/effects'
import { fetchCalendar, watchCalendar, apiFetchCalendar } from './Calendar'
import {
  LOAD_CALENDAR_REQUEST,
  calendarLoadRequest,
  calendarLoadSuccess,
  CalendarLoadSuccessAction,
  calendarLoadFail
} from '../actions/Calendar'

it('should do fake data fetching', () => {
  const action = calendarLoadRequest({id: '1234'}, 0)
  const generator = fetchCalendar(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchCalendar)
  );

  // check dispatching of result
  const demoData = {
    accounts: [],
  }
  const res = generator.next(demoData).value as PutEffect<CalendarLoadSuccessAction>
  expect(
    res
  ).toEqual(
    put(calendarLoadSuccess({accounts: []}, res.PUT.action.timestamp))
  );
})

it('should put calendarLoadFail on fetch fail', () => {
  const action = calendarLoadRequest({id: '1234'}, 0)
  const generator = fetchCalendar(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(calendarLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchCalendar();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_CALENDAR_REQUEST, fetchCalendar)
  );
})
