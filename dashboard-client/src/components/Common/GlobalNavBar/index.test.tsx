import * as React from 'react';
import * as ReactDOM from 'react-dom';

import GlobalNavBar from './';
import { GlobalNavBarProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GlobalNavBarProps = {
    agentId: 1,
    pageOpen: 'activity',
    pageNavigate: () => null,
    isFetching: true,
    data: {
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
  }

  ReactDOM.render(<MuiThemeProvider><GlobalNavBar {...props}/></MuiThemeProvider>, div);
});
