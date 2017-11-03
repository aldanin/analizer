import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LoginPageContent from './';
import { LoginPageContentProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LoginPageContentProps = {
    handleLogin: (username, password) => null,
    currentlySending: false,
    errorMsg: '',
  }

  ReactDOM.render(<MuiThemeProvider><LoginPageContent {...props}/></MuiThemeProvider>, div);
});
