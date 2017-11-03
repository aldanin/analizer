import * as React from 'react';
import * as ReactDOM from 'react-dom';

import NotAvailable from './NotAvailable';
import { NotAvailableProps } from './NotAvailable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: NotAvailableProps = {
  }

  ReactDOM.render(<MuiThemeProvider><NotAvailable {...props}/></MuiThemeProvider>, div);
});
