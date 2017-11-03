import { call, put, takeEvery } from 'redux-saga/effects'
import { APP_NAV_MENU_REQUEST, navMenuLoadError, navMenuLoadRequest, navMenuLoadSuccess } from '../actions/App';
import { apiFetchNavMenu, fetchNavMenu, watchNavMenu } from './App';
import { AgentUnreadProducts } from '../../types/Agent';

it('should do fake data fetching', () => {
  const action = navMenuLoadRequest({agentId: 1})
  const generator = fetchNavMenu(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchNavMenu)
  );

  // check dispatching of result
  const demoData = [0, {
    productSum: {
      userApps: 0,
      sensors: 0,
      deviceSystem: 0,
    },
    userApps: {
      calls: 0,
      im: 0,
      mail: 0,
      contacts: 0,
      socialNetwork: 0,
      browser: 0,
      gallery: 0,
      calendar: 0,
    },
    sensors: {
      activity: 0,
      snapshots: 0,
      envAudio: 0,
      locations: 0,
    },
    deviceSystem: {
      directory: 0,
      systemInfo: 0,
      accounts: 0,
    }
  },  {
    productSum: {
      userApps: 0,
      sensors: 0,
      deviceSystem: 1,
    },
    userApps: {
      calls: 0,
      im: 0,
      mail: 0,
      contacts: 0,
      socialNetwork: 0,
      browser: 0,
      gallery: 0,
      calendar: 0,
    },
    sensors: {
      activity: 0,
      snapshots: 0,
      envAudio: 0,
      locations: 0,
    },
    deviceSystem: {
      directory: 0,
      systemInfo: 1,
      accounts: 0,
    }
  },  {
    productSum: {
      userApps: 254,
      sensors: 440,
      deviceSystem: 21,
    },
    userApps: {
      calls: 9,
      im: 97,
      mail: 14,
      contacts: 0,
      socialNetwork: 7,
      browser: 8,
      gallery: 119,
      calendar: 0,
    },
    sensors: {
      activity: 107,
      snapshots: 233,
      envAudio: 52,
      locations: 48,
    },
    deviceSystem: {
      directory: 8,
      systemInfo: 12,
      accounts: 1,
    }
  },  {
    productSum: {
      userApps: 254,
      sensors: 440,
      deviceSystem: 21,
    },
    userApps: {
      calls: 9,
      im: 97,
      mail: 14,
      contacts: 0,
      socialNetwork: 7,
      browser: 8,
      gallery: 119,
      calendar: 0,
    },
    sensors: {
      activity: 107,
      snapshots: 233,
      envAudio: 52,
      locations: 48,
    },
    deviceSystem: {
      directory: 8,
      systemInfo: 12,
      accounts: 1,
    }
  }]
  expect(
    generator.next(demoData).value
  ).toEqual(
    put(navMenuLoadSuccess({data: (demoData[1] as AgentUnreadProducts)}))
  );
})

it('should put navMenuLoadFail on fetch fail', () => {
  const action = navMenuLoadRequest({agentId: 1})
  const generator = fetchNavMenu(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(navMenuLoadError({error: error}))
  )
})

it('should watch load action of navMenu', () => {
  const generator = watchNavMenu();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(APP_NAV_MENU_REQUEST, fetchNavMenu)
  );
})
