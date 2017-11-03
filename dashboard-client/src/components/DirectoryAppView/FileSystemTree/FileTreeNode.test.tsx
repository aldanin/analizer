import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FileTreeNode from './FileTreeNode';
import { FileTreeNodeProps } from './FileTreeNode';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from '../Theme';
import { ThemeProvider } from 'styled-components';
import * as Dir from '../../../types/Directory'
import * as Prod from '../../../types/Product'
import * as Tag from '../../../types/Tag'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FileTreeNodeProps = {
    level: 3,
    node: Dir.defaultFileSystemNode,
    tags: [],
    status: {
      isFavorite: false,
      hasTranslation: false,
      isRead: false,
      hasTranscript: false,
    },
    handlers: {
      nodeClick: (item: Dir.FileSystemItem) => null,
      onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => null,
      setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => null,
      openNotebook: (itemId: Prod.ProductID) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      getTranscription: (itemId: Prod.ProductID) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      markAsRead: (itemId: Prod.ProductID, isRead: boolean) => null,
    },
    theme: DEFAULT_THEME,
    selectedNodePath: ''
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <FileTreeNode {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
