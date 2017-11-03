import * as Redux from 'redux'
import { initialState } from './App'

import { fromJS }  from 'immutable'
import appReducer from './App';
import { agentSelected, navMenuLoadError, navMenuLoadRequest, navMenuLoadSuccess, pageNavigate } from '../actions/App';
import { AgentUnreadProducts } from '../../types/Agent';

it('should provide the initial state', () => {
  expect(appReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle APP_NAV_MENU_REQUEST actions', () => {
  const state = {
    isMenuFetching: true,
    agentId: null,
    error: null,
    currentPage: '',
    menuData: {
      productSum: {
        userApps: null,
        sensors: null,
        deviceSystem: null,
      },
      userApps: {
        calls: null,
        im: null,
        mail: null,
        contacts: null,
        socialNetwork: null,
        browser: null,
        gallery: null,
        calendar: null,
      },
      sensors: {
        activity: null,
        snapshots: null,
        envAudio: null,
        locations: null,
      },
      deviceSystem: {
        directory: null,
        systemInfo: null,
        accounts: null,
      }
    },
  }
  expect(appReducer(initialState, navMenuLoadRequest({agentId: 1}))).toEqual(fromJS(state))
})

it('should handle APP_NAV_MENU_SUCCESS: actions', () => {
  const payload: AgentUnreadProducts = {
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
    }
  const resultState = {
    isMenuFetching: false,
    agentId: null,
    error: null,
    currentPage: '',
    menuData: {
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
    },
  }

  expect(appReducer(initialState, navMenuLoadSuccess({data: payload}))).toEqual(fromJS(resultState))
})

it('should handle APP_NAV_MENU_ERROR actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isMenuFetching: false,
    agentId: null,
    error: 'Foo bar',
    currentPage: '',
    menuData: {
      productSum: {
        userApps: null,
        sensors: null,
        deviceSystem: null,
      },
      userApps: {
        calls: null,
        im: null,
        mail: null,
        contacts: null,
        socialNetwork: null,
        browser: null,
        gallery: null,
        calendar: null,
      },
      sensors: {
        activity: null,
        snapshots: null,
        envAudio: null,
        locations: null,
      },
      deviceSystem: {
        directory: null,
        systemInfo: null,
        accounts: null,
      }
    },
  }
  expect(appReducer(initialState, navMenuLoadError({error: payload}))).toEqual(fromJS(resultState))
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isMenuFetching: false,
    agentId: null,
    error: null,
    currentPage: '',
    menuData: {
      productSum: {
        userApps: null,
        sensors: null,
        deviceSystem: null,
      },
      userApps: {
        calls: null,
        im: null,
        mail: null,
        contacts: null,
        socialNetwork: null,
        browser: null,
        gallery: null,
        calendar: null,
      },
      sensors: {
        activity: null,
        snapshots: null,
        envAudio: null,
        locations: null,
      },
      deviceSystem: {
        directory: null,
        systemInfo: null,
        accounts: null,
      }
    },
  })
  expect(appReducer(state, { type: 'unknown' })).toEqual(state)
})

it('should handle APP_PAGE_NAVIGATE actions', () => {
  const payload = 'Gallery';
  const resultState = {
    isMenuFetching: false,
    agentId: null,
    error: null,
    currentPage: 'Gallery',
    menuData: {
      productSum: {
        userApps: null,
        sensors: null,
        deviceSystem: null,
      },
      userApps: {
        calls: null,
        im: null,
        mail: null,
        contacts: null,
        socialNetwork: null,
        browser: null,
        gallery: null,
        calendar: null,
      },
      sensors: {
        activity: null,
        snapshots: null,
        envAudio: null,
        locations: null,
      },
      deviceSystem: {
        directory: null,
        systemInfo: null,
        accounts: null,
      }
    },
  }
  expect(appReducer(initialState, pageNavigate({page: payload}))).toEqual(fromJS(resultState))
})

it('should handle APP_SELECT_AGENT actions', () => {
  const payload = {
    agentId: 0,
  }
  const resultState = {
    isMenuFetching: true,
    agentId: 0,
    error: null,
    currentPage: '',
    menuData: {
      productSum: {
        userApps: null,
        sensors: null,
        deviceSystem: null,
      },
      userApps: {
        calls: null,
        im: null,
        mail: null,
        contacts: null,
        socialNetwork: null,
        browser: null,
        gallery: null,
        calendar: null,
      },
      sensors: {
        activity: null,
        snapshots: null,
        envAudio: null,
        locations: null,
      },
      deviceSystem: {
        directory: null,
        systemInfo: null,
        accounts: null,
      }
    },
  }
  expect(appReducer(initialState, agentSelected(payload))).toEqual(fromJS(resultState))
})
