import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SortMenu from './SortMenu';
import { SortMenuProps } from './SortMenu';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SortMenuProps = {
    sortOrder: 0,
    onChange: (val) => null,
  }

  ReactDOM.render(<MuiThemeProvider><SortMenu {...props}/></MuiThemeProvider>, div);
});
