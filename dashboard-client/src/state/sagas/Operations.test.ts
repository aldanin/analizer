import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchOperations, watchOperations, apiFetchOperations } from './Operations'
import {
  LOAD_OPERATIONS_REQUEST,
  operationsLoad,
  operationsLoadSuccess,
  operationsLoadFail
} from '../actions/Operations'

it('should do fake data fetching', () => {
  const action = operationsLoad()
  const generator = fetchOperations(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchOperations)
  );

  // check dispatching of result
  const demoData = []

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(operationsLoadSuccess(demoData))
  );
})

it('should put operationsLoadFail on fetch fail', () => {
  const action = operationsLoad()
  const generator = fetchOperations(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(operationsLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchOperations();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_OPERATIONS_REQUEST, fetchOperations)
  );
})
