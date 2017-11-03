import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LoginForm from './LoginForm';
import { LoginFormProps } from './LoginForm';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ThemeProvider } from 'styled-components'
import * as Theme from './Theme'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LoginFormProps = {
    onSubmit: (username, password) => null,
    btnText: 'Foo',
    error: 'Error!',
    currentlySending: false,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.defaultTheme}>
        <LoginForm {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
