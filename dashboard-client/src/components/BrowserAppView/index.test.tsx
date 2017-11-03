import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BrowserAppView from './';
import { BrowserAppViewProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: BrowserAppViewProps = {
    browser: {
      browserData: {
        bookmarks: {
          extracted: 13,
          browsers: [],
        },
        history: [],
        timerIndicator: 1234,
        updateTimeIndicator: 1234,
      }
    },
    handlers: {
      requestUpdate: () => null,
      extractNow: () => null,
      bookmarkSetStar: () => null,
      historySetStar: () => null,
      bookmarkRemoveTag: () => null,
      historyRemoveTag: () => null,
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
    },
    filters: {
      show: () => null,
      tag: () => null,
      action: () => null,
    },
    isGroupMode: false,
    changeGroupByMode: () => null,
    isFetching: true,
    isFirstHistoryRequest: false,
    keyword: '',
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <BrowserAppView {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
