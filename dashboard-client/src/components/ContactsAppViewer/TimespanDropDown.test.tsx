import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'

import TimespanDropDown from './TimespanDropDown';
import { TimespanDropDownProps } from './TimespanDropDown';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TimespanDropDownProps = {
    onChange: (value: number) => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(<MuiThemeProvider><TimespanDropDown {...props}/></MuiThemeProvider>, div);
});
