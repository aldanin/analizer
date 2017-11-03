import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getData } from '../mockData/Data'
import * as Theme from '../Theme'
import AccountsDetailsPane from './AccountsDetailsPane';
import { AccountsDetailsProps } from './AccountsDetailsPane';
import { ThemeProvider } from 'styled-components'
import { ConflictingPassword } from '../../../types/Accounts'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AccountsDetailsProps = {
    accountItem: getData(1, 10, null)[0],
    handlers: {
      addTag: (id) => null,
      setFavorite: (id, isFavoritState) => null,
      onConflictingPasswordClick: (accountId: 1, password: ConflictingPassword) => null
    },
    theme: Theme.defaultTheme
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.defaultTheme}>
        <AccountsDetailsPane {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
