import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchUserData, watchUser, apiGetUserData } from './User'
import { USER_DATA_REQUEST, userDataRequest, userDataSuccess, userDataFail } from '../actions/User'

it('should do fake data fetching', () => {
  const action = userDataRequest('1234124543')
  const generator = fetchUserData(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiGetUserData, action.userId)
  );

  // check dispatching of result
  const demoData = {
    name: 'foo',
    id: '1234124543'
  }

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(userDataSuccess(demoData))
  );
})

it('should put USER_DATA_FAIL on fetch fail', () => {
  const action = userDataRequest('1234124543')
  const generator = fetchUserData(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(userDataFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchUser();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(USER_DATA_REQUEST, fetchUserData)
  );
})
