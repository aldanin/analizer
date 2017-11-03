import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserPage } from './BrowserPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    browser: {
      browserData: null,
    },

    isFetching: true,
    isFirstHistoryRequest: false,
    isError: false,
    loadBrowser: (agent: 1) => null,
    requestUpdate: () => null,
    extractNow: () => null,
    bookmarkSetStar: (id: 123, isFavorite: true) => null,
    historySetStar: (id: 123, isFavorite: true) => null,
    bookmarkRemoveTag: (id: 123, tagId: '1') => null,
    historyRemoveTag: (id: 123, tagId: '1') => null,
    bookmarkOpenNotebook: () => null,
    bookmarkAskForTranslate: () => null,
    bookmarkGetTranslate: () => null,
    historyOpenNotebook: () => null,
    historyAddTag: () => null,
    historyAddToNotebook: () => null,
    historyMarkAsRead: () => null,
    historyMarkAsUnRead: () => null,
    historyAskForTranslate: () => null,
    historyAskForTranscript: () => null,
    historyExportItem: () => null,
    historyGetTranslate: () => null,
    bookmarksAddTag: () => null,
    bookmarksAddToNotebook: () => null,
    bookmarksMarkAsRead: () => null,
    bookmarksMarkAsUnRead: () => null,
    bookmarksAskForTranslate: () => null,
    bookmarksAskForTranscript: () => null,
    bookmarksExportItem: () => null,
    show: () => null,
    tags: () => null,
    actions: () => null,
    keyword: '',
    isGroupMode: true,
    changeGroupByMode: (isGroupMode: true) => null,
    params: '',
  };
  ReactDOM.render(
    <MuiThemeProvider>
      <BrowserPage {...props}/>
    </MuiThemeProvider>,
    div);
});
