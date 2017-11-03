import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FilterMenuShow from './FilterMenuShow';
import { FilterMenuShowProps } from './FilterMenuShow';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FilterMenuShowProps = {
    values: [],
    options: [],
    onChangeCb: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><FilterMenuShow {...props}/></MuiThemeProvider>, div);
});
