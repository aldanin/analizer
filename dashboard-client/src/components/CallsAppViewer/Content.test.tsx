import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AccountsContent from './Content';
import { ContentProps } from './Content';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContentProps = {
    handlers: {
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (id, tagId) => null,
      setFavorite: (id, setFavorite) => null,
      markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => null,
      loadNextPage: () => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onHeaderClick: (colKey: any) => null,
      onItemCheck: (itemId: Prod.ProductID, checkedStatus: boolean) => null,
      addToNotebook: (itemIds: Prod.ProductID[]) => null,
      openNotebook: (itemIds: Prod.ProductID[]) => null,
      getTranscription: (itemIds: Prod.ProductID[]) => null,
      askForTranslate: (itemIds: Prod.ProductID[]) => null,
    },
    data: [],
    checkedItems: {},
    hasNextPage: false,
    isFetching: false,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <AccountsContent {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
