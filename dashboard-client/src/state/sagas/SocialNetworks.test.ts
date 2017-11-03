import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchSocialNetworks, watchSocialNetworks, apiFetchSocialNetworks } from './SocialNetworks'
import {
  LOAD_SOCIAL_NETWORKS_REQUEST,
  socialNetworksLoadRequest,
  socialNetworksLoadSuccess,
  socialNetworksLoadFail
} from '../actions/SocialNetworks'

it('should do fake data fetching', () => {
  const action = socialNetworksLoadRequest('1')
  const generator = fetchSocialNetworks(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchSocialNetworks)
  );

  // check dispatching of result
  const demoData = 1234567;

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(socialNetworksLoadSuccess(demoData))
  );
})

it('should put socialNetworksLoadFail on fetch fail', () => {
  const action = socialNetworksLoadRequest('1')
  const generator = fetchSocialNetworks(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(socialNetworksLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchSocialNetworks();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_SOCIAL_NETWORKS_REQUEST, fetchSocialNetworks)
  );
})
