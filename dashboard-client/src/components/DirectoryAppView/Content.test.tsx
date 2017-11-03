import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Content from './Content';
import { ContentProps } from './Content';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'
import * as Dir from '../../types/Directory'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContentProps = {
    handlers: {
      toggleExpandState: (path: string) => null,
      onItemCheck: (itemId: Dir.directoryTreeObjectId, checkedStatus: boolean) => null,
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => null,
      loadNextFileListPage: (filters?: any) => null,
      loadDirectoryContent: (path: string) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onColumnHeaderClick: (colKey: any) => null,
      onHeaderClick: (colKey: any) => null,
      openNotebook: (itemIds: Prod.ProductID[]) => null,
      askForTranslate: (itemId: Prod.ProductID[]) => null,
      getTranscription: (itemId: Prod.ProductID[]) => null,
      addToNotebook: (itemId: Prod.ProductID[]) => null,
      markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => null,
      extractionDateChange: (date: number) => null,
      download: (url: string) => null,
    },
    actionMode: Dir.DirectoryActionMode.directoryTree,
    directoryTreeRoot: Dir.defaultFileSystemNode,
    fileList: [],
    checkedItems: {},
    metadata: {
      timerIndicator: 253523523,
      updateTimeIndicator: 200000,
      extractionDate: 234234234
    },
    hasNextFileListPage: false,
    isFetching: false,
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
