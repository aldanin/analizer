import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { APP_SYMBOLS } from '../../../../types/AppSymbols'
import * as Theme from './Theme'
import { MuiThemeProvider } from 'material-ui'

import ClickableIcon from './index';
import { ClickableIconProps } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ClickableIconProps = {
    onClick: (ev) => null,
    appSymbol: APP_SYMBOLS.phone,
    theme: Theme.defaultTheme
  }

  ReactDOM.render(<MuiThemeProvider><ClickableIcon {...props}/></MuiThemeProvider>, div);
});
