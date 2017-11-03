import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DirectoryAppView from './';
import { DirectoryAppViewProps } from './';
import * as Dir from '../../types/Directory'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Filters from '../../types/Filters'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DirectoryAppViewProps = {
    directoryTreeRoot: Dir.defaultFileSystemNode,
    fileList: [],
    metadata: {
      timerIndicator: 253523523,
      updateTimeIndicator: 200000,
      extractionDate: 234234234
    },
    hasNextFileListPage: true,
    contentHandlers: {
      toggleExpandState: (path: string) => null,
      refreshFileList: (filters: Filters.FiltersData) => null,
      refreshDirectoryTree: (filters: Filters.FiltersData) => null,
      loadNextFileListPage: (filters?: Filters.FiltersData) => null,
      loadDirectoryContent: (path: string, filters?: Filters.FiltersData) => null,
      onSliceRendered: (startIndex: number, stopIndex: number) => null,
      requestUpdate: () => null,
      extractNow: () => null,
      setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => null,
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      openNotebook: (itemId: Prod.ProductID[]) => null,
      askForTranslate: (itemId: Prod.ProductID[]) => null,
      getTranscription: (itemId: Prod.ProductID[]) => null,
      addToNotebook: (itemId: Prod.ProductID[]) => null,
      markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => null,
      downloadFile: (url: string) => null,
    },
    filters: {
      show: () => null,
      tag: () => null,
      action: () => null,
      search: () => null,
      selectType: () => null,
    },
    // isGroupMode: false,
    // changeGroupByMode: () => {
    // },
    expandAll: () => null,
    collapseAll: () => null,
    isFetching: true,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <DirectoryAppView {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
