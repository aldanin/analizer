import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchTargets, watchTargets, apiFetchTargets } from './Targets'
import { LOAD_TARGETS_REQUEST, targetsLoadRequest, targetsLoadSuccess, targetsLoadFail } from '../actions/Targets'

it('should do fake data fetching', () => {
  const action = targetsLoadRequest()
  const generator = fetchTargets(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchTargets)
  );

  // check dispatching of result
  const demoData = []

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(targetsLoadSuccess(demoData))
  );
})

it('should put targetsLoadFail on fetch fail', () => {
  const action = targetsLoadRequest()
  const generator = fetchTargets(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(targetsLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchTargets();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_TARGETS_REQUEST, fetchTargets)
  );
})
