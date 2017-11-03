import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AccountsContent from './Content';
import { ContentProps } from './Content';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'
import { ConflictingPassword } from '../../types/Accounts'
import { FiltersData } from '../../types/Filters'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContentProps = {
    handlers: {
      addTag: (id) => null,
      removeTag: (id, tagId) => null,
      setFavorite: (id, setFavorite) => null,
      loadNextPage: (filters?: FiltersData) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onColumnHeaderClick: (colKey: any) => null,
      onHeaderClick: (colKey: any) => null,
      onConflictingPasswordClick: (accountId: number, password: ConflictingPassword) => null
    },
    data: [],
    hasNextPage: false,
    isFetching: false,
    theme: Theme.defaultTheme
  }

  const jsx = (
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.defaultTheme}>
        <AccountsContent {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>
  )

  ReactDOM.render(jsx, div);
});
