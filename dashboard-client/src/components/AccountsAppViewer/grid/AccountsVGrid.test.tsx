import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AccountsVGrid from './AccountsVGrid';
import { AccountsVGridProps } from './AccountsVGrid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Theme from '../Theme'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AccountsVGridProps = {
    data: [],
    selectedItem: null,
    hasNextPage: false,
    isFetching: false,
    handlers: {
      addTag: (id, tagId) => null,
      removeTag: (id, tagId) => null,
      setFavorite: (id, isFavoritState) => null,
      rowClick: (x, y) => null,
      loadNextPage: () => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onHeaderClick: (sortBy, sortDirection) => null,
    },
    theme: Theme.defaultTheme
  };

  ReactDOM.render(<MuiThemeProvider><AccountsVGrid {...props}/></MuiThemeProvider>, div);
});
