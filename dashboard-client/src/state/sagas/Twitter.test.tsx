import { call, put, takeEvery } from 'redux-saga/effects';
import { twitterLoadRequest, twitterLoadSuccess, LOAD_TWITTER_REQUEST, twitterLoadFail } from '../actions/Twitter';
import { apiFetchTwitter, fetchTwitter, watchTwitter } from './Twitter';
import { demoTwitterData } from '../../mockData/Twitter';

it('should do fake data fetching', () => {
  const action = twitterLoadRequest('1')
  const generator = fetchTwitter(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchTwitter)
  );

  // check dispatching of result
  const demoData = demoTwitterData;

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(twitterLoadSuccess(demoData))
  );
})

it('should put socialNetworksLoadFail on fetch fail', () => {
  const action = twitterLoadRequest('1')
  const generator = fetchTwitter(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(twitterLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchTwitter();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_TWITTER_REQUEST, fetchTwitter)
  );
})
