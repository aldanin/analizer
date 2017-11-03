import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AccountFilter from './AccountFilter';
import { AccountFilterProps } from './AccountFilter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AccountFilterProps = {
    id: 0,
    index: 0,
    numberOfAccounts: 4,
    account: '1',
    accountFilter: () => null,
    isActive: true,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <AccountFilter {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
