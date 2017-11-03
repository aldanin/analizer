import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RecentLocations from './RecentLocations';
import { RecentLocationsProps } from './RecentLocations';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: RecentLocationsProps = {
  }

  ReactDOM.render(<MuiThemeProvider><RecentLocations {...props}/></MuiThemeProvider>, div);
});
