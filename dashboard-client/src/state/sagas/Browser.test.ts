import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchBrowser, watchBrowser, apiFetchBrowser } from './Browser'
import { LOAD_BROWSER_REQUEST, browserLoadRequest, browserLoadSuccess, browserLoadFail } from '../actions/Browser'

it('should do fake data fetching', () => {
  const action = browserLoadRequest({id: 1234})
  const generator = fetchBrowser(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchBrowser)
  );

  // check dispatching of result
  const demoData = []

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(browserLoadSuccess(demoData))
  );
})

it('should put browserLoadFail on fetch fail', () => {
  const action = browserLoadRequest({id: 1234})
  const generator = fetchBrowser(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(browserLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchBrowser();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_BROWSER_REQUEST, fetchBrowser)
  );
})
