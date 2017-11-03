import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { APP_SYMBOLS } from '../../../types/AppSymbols'
import * as Theme from './Theme'
import { MuiThemeProvider } from 'material-ui'

import AppIcon from './index';
import { AppIconProps } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AppIconProps = {
    appSymbol: APP_SYMBOLS.phone,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(<MuiThemeProvider><AppIcon {...props}/></MuiThemeProvider>, div);
});
