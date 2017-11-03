import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Checkbox from './';
import { CheckboxProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CheckboxProps = {
    size: '20px',
    onCheck: () => null,
    isChecked: true,
  }

  ReactDOM.render(<MuiThemeProvider><Checkbox {...props}/></MuiThemeProvider>, div);
});
