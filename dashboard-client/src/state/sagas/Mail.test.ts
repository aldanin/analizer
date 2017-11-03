import { call, put, takeEvery } from 'redux-saga/effects'
import { apiFetchMail, fetchMail, watchMail } from './Mail'
import {
  mailLoadRequest,
  mailLoadFail, LOAD_MAIL_REQUEST, mailLoadSuccess
} from '../actions/Mail'

it('should do fake data fetching', () => {
  const action = mailLoadRequest('1234')
  const generator = fetchMail(action);

  let demoData = {
    data: {
      accounts: null,
    },
    timestamp: 123,
  }

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchMail)
  );

  // check dispatching of result
  expect(
    generator.next(demoData).value
  ).toEqual(
    put(mailLoadSuccess(demoData.data, demoData.timestamp))
  );
})

it('should put mailLoadFail on fetch fail', () => {
  const action = mailLoadRequest('1234')
  const generator = fetchMail(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(mailLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchMail();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_MAIL_REQUEST, fetchMail)
  );
})
