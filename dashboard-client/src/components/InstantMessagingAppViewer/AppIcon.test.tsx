import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'
import { MuiThemeProvider } from 'material-ui'

import AppIcon from './AppIcon';
import { AppIconProps } from './AppIcon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AppIconProps = {
    iconKey: 'phone',
    color: 'blue',
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(<MuiThemeProvider><AppIcon {...props}/></MuiThemeProvider>, div);
});
