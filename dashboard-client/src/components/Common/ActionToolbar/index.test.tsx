import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ActionToolbar from './';
import { ActionToolbarProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ActionToolbarProps = {
  }

  ReactDOM.render(<MuiThemeProvider><ActionToolbar {...props}/></MuiThemeProvider>, div);
});
