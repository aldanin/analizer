import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'

import DirectoryTreeNode from './DirectoryTreeNode';
import { DirectoryTreeNodeProps } from './DirectoryTreeNode';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as Dir from '../../../types/Directory'
import * as Prod from '../../../types/Product'
import * as Tag from '../../../types/Tag'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from '../Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DirectoryTreeNodeProps = {
    level: 2,
    node: Dir.defaultFileSystemNode,
    tags: [],

    handlers: {
      nodeClick: (item: Dir.FileSystemItem, path: string, mayToggle: boolean) => null,
      onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => null,
      loadDirectoryContent: (path: string) => null,
      setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => null,
      openNotebook: (itemId: Prod.ProductID) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      getTranscription: (itemId: Prod.ProductID) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      markAsRead: (itemId: Prod.ProductID, isRead: boolean) => null,
    },
    status: {
      isFavorite: false,
      hasTranslation: false,
      isRead: false,
      hasTranscript: false,
    },
    selectedNodePath: '',
    isFetching: false,
    theme: DEFAULT_THEME,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <DirectoryTreeNode {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
