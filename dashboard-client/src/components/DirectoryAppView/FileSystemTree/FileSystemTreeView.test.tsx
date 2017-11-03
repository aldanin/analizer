import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from '../Theme'
import * as Dir from '../../../types/Directory'
import * as Prod from '../../../types/Product'
import * as Tag from '../../../types/Tag'
import FileSystemTreeView from './FileSystemTreeView';
import { FileSystemTreeViewProps } from './FileSystemTreeView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FileSystemTreeViewProps = {
    data: {
      directoryTreeRoot: Dir.defaultFileSystemNode,
      extracted: 200000,
    },
    isFetching: false,
    selectedFileSystemItemPath: Dir.defaultFileSystemNode.path,
    nodeClick: (item: Dir.FileSystemItem, path: string, mayToggle: boolean) => null,
    onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => null,
    // toggleExpandState: () => {
    // },
    loadDirectoryContent: () => null,
    setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => null,
    removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
    addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => null,
    openNotebook: (itemId: Prod.ProductID) => null,
    askForTranslate: (itemId: Prod.ProductID) => null,
    getTranscription: (itemId: Prod.ProductID) => null,
    addToNotebook: (itemId: Prod.ProductID) => null,
    markAsRead: (itemId: Prod.ProductID, isRead: boolean) => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(<MuiThemeProvider><FileSystemTreeView {...props}/></MuiThemeProvider>, div);
});
