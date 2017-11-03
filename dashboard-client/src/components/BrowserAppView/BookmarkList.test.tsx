import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BookmarkList from './BookmarkList';
import { BookmarkListProps } from './BookmarkList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: BookmarkListProps = {
    data: {
      browsers: [],
      extracted: 200000,
    },
    isExpandMode: true,
    bookmarkSetStar: () => null,
    bookmarkRemoveTag: () => null,
    bookmarkOpenNotebook: () => null,
    bookmarkAskForTranslate: () => null,
    bookmarkGetTranslate: () => null,
    bookmarksAddTag: () => null,
    bookmarksAddToNotebook: () => null,
    bookmarksMarkAsRead: () => null,
    bookmarksMarkAsUnRead: () => null,
    bookmarksAskForTranslate: () => null,
    bookmarksAskForTranscript: () => null,
    bookmarksExportItem: () => null,
    onItemSelected: () => null,
    onItemUnSelected: () => null,
    isOpen: () => {return true},
    updateOpenItems: () => null,
    isItemSelected: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><BookmarkList {...props}/></MuiThemeProvider>, div);
});
