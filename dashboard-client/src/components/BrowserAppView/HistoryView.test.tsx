import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HistoryView from './HistoryView';
import { HistoryViewProps } from './HistoryView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: HistoryViewProps = {
    historyData: [],
    setStar: () => null,
    historyRemoveTag: () => null,
    historyOpenNotebook: () => null,
    historyAddTag:  () => null,
    historyAddToNotebook:  () => null,
    historyMarkAsRead:  () => null,
    historyMarkAsUnRead:  () => null,
    historyAskForTranslate:  () => null,
    historyAskForTranscript:  () => null,
    historyExportItem:  () => null,
    historyGetTranslate: () => null,
    historyItemSelected: () => null,
    historyItemUnSelected: () => null,
    isItemSelected: () => null,
    loadMoreData: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <HistoryView {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
