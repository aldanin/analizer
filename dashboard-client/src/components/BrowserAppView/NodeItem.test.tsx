import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ListItem from './NodeItem';
import { NodeItemProps } from './NodeItem';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
import KeywordProvider from '../Common/SearchMarker/KeywordProvider';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: NodeItemProps = {
    level: 1,
    autoExpand: false,
    node: {
      id: 0,
      type: 'site',
      site: {
        name: '1',
        icon: '2',
      },
      url: '',
      isFavorite: true,
      hasNotes: true,
      hasTranslation: true,
      isRead: true,
      tags: [],
    },
    changeOpenState: (id: 1, state: false) => null,
    isOpen: (id: 1) => {return true},
    setStar: () => null,
    removeTag: () => null,
    openNotebook: () => null,
    askForTranslate: () => null,
    getTranslate: () => null,
    bookmarksAddTag:  () => null,
    bookmarksAddToNotebook:  () => null,
    bookmarksMarkAsRead:  () => null,
    bookmarksMarkAsUnRead:  () => null,
    bookmarksAskForTranslate:  () => null,
    bookmarksAskForTranscript:  () => null,
    bookmarksExportItem:  () => null,
    onItemSelected: () => null,
    onItemUnSelected: () => null,
    isItemSelected: () => null,
    updateDataIsExist: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <KeywordProvider keyword="">
          <ListItem {...props}/>
        </KeywordProvider>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
