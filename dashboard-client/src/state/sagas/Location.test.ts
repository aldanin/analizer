import { call, put, takeEvery, PutEffect } from 'redux-saga/effects'
import {
  LOAD_LOCATION_REQUEST,
  locationLoadFail,
  locationLoadRequest,
  locationLoadSuccess,
  LocationLoadSuccessAction,
} from '../actions/Location';
import {
  apiFetchLocation,
  fetchLocation,
  watchLocation
} from './Location';

it('should do fake data fetching', () => {
  const action = locationLoadRequest('1234')
  const generator = fetchLocation(action);

  let demoData = {
    data: [],
    timestamp: 123,
  }

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchLocation)
  );

  // check dispatching of result
  const res = generator.next(demoData.data).value as PutEffect<LocationLoadSuccessAction>
  expect(
    res
  ).toEqual(
    put(locationLoadSuccess(demoData.data, res.PUT.action.timestamp))
  );
})

it('should put locationLoadFail on fetch fail', () => {
  const action = locationLoadRequest('1234')
  const generator = fetchLocation(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(locationLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchLocation();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_LOCATION_REQUEST, fetchLocation)

  );
})
