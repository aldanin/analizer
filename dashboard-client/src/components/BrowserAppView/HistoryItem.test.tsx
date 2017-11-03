import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HistoryItem from './HistoryItem';
import { HistoryItemProps } from './HistoryItem';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
import KeywordProvider from '../Common/SearchMarker/KeywordProvider';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: HistoryItemProps = {
    id: 1,
    isRead: true,
    timestamp: 123456789,
    title: {
      name: 'google',
      icon: 'google',
    },
    cleanUrl: 'http://www.google.com',
    extraUrl: '/q=?blabla',
    browser: {
      name: 'Chrome',
      icon: 'chrome',
      url: '',
    },
    tags: [],
    isFavorite: true,
    isNoteBook: false,
    isTranslate: false,
    setStar: () => null,
    removeTag: () => null,
    openNotebook: () => null,
    addTag: () => null,
    addToNotebook: () => null,
    markAsRead: () => null,
    markAsUnRead: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    getTranslate: () => null,
    historyItemSelected: () => null,
    historyItemUnSelected: () => null,
    isItemSelected: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <KeywordProvider keyword="">
          <HistoryItem {...props}/>
        </KeywordProvider>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
