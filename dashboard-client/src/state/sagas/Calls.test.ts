import { call, put, takeLatest } from 'redux-saga/effects'
import * as Sagas from './Calls'
import * as Actions from '../actions/Calls'

it('should do fake data fetching', () => {
  const action = Actions.callsLoadRequest('1', 1, 25, null, null)
  const generator = Sagas.fetchCallsData(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(Sagas.promisedGetData, 1, 25, null)
  );

  // check dispatching of result
  const demoData = {callsData: undefined, nextPageNumber: 2, totalCount: 0, filters: null}

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(Actions.callsLoadSuccess(demoData.callsData, 2, demoData.totalCount))
  );
})

it('should watch calls actions', () => {
  const generator = Sagas.watchCalls();

  expect(
    generator.next().value
  ).toEqual(
    takeLatest(Actions.CALLS_LOAD_REQUEST, Sagas.fetchCallsData)
  );
})
