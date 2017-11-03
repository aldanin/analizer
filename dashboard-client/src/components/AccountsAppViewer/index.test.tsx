import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AccountsAppViewer from './';
import { AccountsAppViewerProps } from './';
import { getData } from './mockData/Data'
import { TagId } from '../../types/Tag'
import * as Theme from './Theme'
import { ConflictingPassword } from '../../types/Accounts'
import { FiltersData } from '../../types/Filters'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const temp = getData(1, 10, null);
  const props: AccountsAppViewerProps = {
    data: temp.accountItems,
    hasNextPage: true,
    isFetching: false,
    contentHandlers: {
      addTag: (id: number) => null,
      removeTag: (id: number, tagId: TagId) => null,
      setFavorite: (number, boolean) => null,
      refresh: (pageSize: number, filters: FiltersData, lastId: number) => null,
      loadNextPage: (filters?: FiltersData) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      // onColumnHeaderClick: (colKey: any) => {
      // },
      // onHeaderClick: (sortBy, sortDirection) => {
      // },

      onConflictingPasswordClick: (accountItem: number, password: ConflictingPassword) => null
    },
    timerIndicator: 33,
    updateTimeIndicator: 20,
    theme: Theme.defaultTheme
  }

  ReactDOM.render(<MuiThemeProvider><AccountsAppViewer {...props}/></MuiThemeProvider>, div);
});
