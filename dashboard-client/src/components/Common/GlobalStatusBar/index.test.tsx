import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GlobalStatusBarP from './';
import { GlobalStatusBarProps } from './';
import Themed from '../../../containers/Themed'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GlobalStatusBarProps = {
    agentData: {
      id: '1',
      name: 'x',
      targetId: '1',
      deviceType: 'Phone',
      deviceOs: 'Android',
      expiry: Date.now(),
      extractInterval: 360000,
      status: {
        lastCommunication: Date.now(),
        lastExtract: Date.now(),
        extractionsTotal: 21,
        extractionsSuccesful: 17,
        dataUsageLastDay: 1.4,
        dataUsageLastWeek: 10.4,
      },
      counters: {
        calls: 11,
        im: 12,
        mail: 13,
        contacts: 14,
        socialNetwork: 15,
        browser: 16,
        gallery: 17,
        calendar: 18,
        activity: 0,
        envAudio: 0,
        snapshots: 0,
        locations: 0,
        directory: 0,
        accounts: 0,
        systemInfo: 0,
      }
    },
    isLoggedIn: true,
    userName: 'Johnny',
    isHomePage: true,
    isGlobalFetching: true,
    doLogout: () => null,
    loadInitialNotifications: () => null,
    notificationsUnreadCount: 9,
  }

  ReactDOM.render(<Themed><GlobalStatusBarP {...props}/></Themed>, div);
});
