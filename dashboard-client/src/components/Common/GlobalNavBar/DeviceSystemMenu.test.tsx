import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { DeviceSystemProps } from './DeviceSystemMenu';
import DeviceSystemMenuComponent from './DeviceSystemMenu'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DeviceSystemProps = {
    viewPageOpen: 'summary',
    isFetching: false,
    total: 23,
    pageNavigate: (page: string) => null,
    agent_id: '1',
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

  ReactDOM.render(<MuiThemeProvider><DeviceSystemMenuComponent {...props}/></MuiThemeProvider>, div);
});
