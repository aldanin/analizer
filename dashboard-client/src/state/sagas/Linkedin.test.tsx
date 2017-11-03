import { call, put, takeEvery } from 'redux-saga/effects';
import { apiFetchLinkedin, fetchLinkedin, watchLinkedin } from './Linkedin';
import { linkedinLoadFail, linkedinLoadRequest, linkedinLoadSuccess, LOAD_LINKEDIN_REQUEST } from '../actions/Linkedin';
import { demoLinkedinData } from '../../mockData/Linkedin';

it('should do fake data fetching', () => {
  const action = linkedinLoadRequest('1')
  const generator = fetchLinkedin(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchLinkedin)
  );

  // check dispatching of result
  const demoData = demoLinkedinData;

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(linkedinLoadSuccess(demoData))
  );
})

it('should put socialNetworksLoadFail on fetch fail', () => {
  const action = linkedinLoadRequest('1')
  const generator = fetchLinkedin(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(linkedinLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchLinkedin();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_LINKEDIN_REQUEST, fetchLinkedin)
  );
})
