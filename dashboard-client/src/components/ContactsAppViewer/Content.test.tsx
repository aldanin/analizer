import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Content from './Content';
import { ContentProps } from './Content';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContentProps = {
    data: [],
    selectedItems: [],
    hasNextPage: false,
    isFetching: false,
    handlers: {
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (id, tagId) => null,
      setFavorite: (id, setFavorite) => null,
      markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => null,
      addToNotebook: (itemIds: Prod.ProductID[]) => null,
      askForTranslate: (itemIds: Prod.ProductID[]) => null,
      askForTranscript: (itemIds: Prod.ProductID[]) => null,
      getTranslate: (itemId: Prod.ProductID) => null,
      getTranscript: (itemId: Prod.ProductID) => null,
      openNotebook: () => null,
      exportItem: (itemIds: Prod.ProductID[]) => null,
      loadNextPage: (isPrevious: boolean) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onHeaderClick: (colKey: any) => null,
      onItemCheck: (itemId: Prod.ProductID, checkedStatus: boolean) => null,
    },
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <Content {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
