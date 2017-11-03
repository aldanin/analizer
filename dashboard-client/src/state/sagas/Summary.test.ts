import { call, put, takeEvery, PutEffect } from 'redux-saga/effects'
import {
  LOAD_SUMMARY_REQUEST,
  sortOptionSelected,
  summaryLoadFail,
  summaryLoadRequest,
  summaryLoadSuccess,
  SummaryLoadSuccessAction,
} from '../actions/Summary';
import { apiFetchSummary, fetchSummary, watchSummary } from './Summary';

it('should do fake data fetching including filters', () => {
  const action = sortOptionSelected(0)
  const generator = fetchSummary(action);

  // Check that Saga asks to call the API
  expect(
    generator.next(0).value
  ).toEqual(
    call(apiFetchSummary, 0)
  );

  // check dispatching of result
  const demoResponse = []
  const res = generator.next(demoResponse).value as PutEffect<SummaryLoadSuccessAction>

  expect(
    res
  ).toEqual(
    put(summaryLoadSuccess(demoResponse, res.PUT.action.timestamp))
  );

})

it('should put summaryLoadFail on fetch fail', () => {
  const action = summaryLoadRequest('1234')
  const generator = fetchSummary(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(summaryLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchSummary();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_SUMMARY_REQUEST, fetchSummary)
  );
})
