import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchSnapshots, watchSnapshots, apiFetchData } from './Snapshots'
import {
  LOAD_SNAPSHOTS_REQUEST,
  snapshotsLoadRequest,
  snapshotsLoadSuccess,
  snapshotsLoadFail
} from '../actions/Snapshots'

it('should do fake data fetching', () => {
  const action = snapshotsLoadRequest('1234')
  const generator = fetchSnapshots(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchData)
  );

  // check dispatching of result
  const demoData = []

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(snapshotsLoadSuccess(demoData))
  );
})

it('should put snapshotsLoadFail on fetch fail', () => {
  const action = snapshotsLoadRequest('1234')
  const generator = fetchSnapshots(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(snapshotsLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchSnapshots();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_SNAPSHOTS_REQUEST, fetchSnapshots)
  );
})
