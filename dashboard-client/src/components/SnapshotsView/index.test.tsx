import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SnapshotsView from './';
import { SnapshotsViewProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SnapshotsViewProps = {
    photos: [],
    isFetching: false,
    isFirstRequest: false,
    updateRequest: () => null,
    updateTimeIndicator: 0,
    lastExtraction: 0,
    extractNow: () => null,
    showFilter: () => null,
    tagsFilter: () => null,
    actions: () => null,
    setStar: () => null,
    removeTag: () => null,
    addTag: () => null,
    addToNotebook: () => null,
    markAsRead: () => null,
    markAsUnRead: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    getFullSizeImage: () => null,
    keyword: '',
  }

  ReactDOM.render(<MuiThemeProvider><SnapshotsView {...props}/></MuiThemeProvider>, div);
});
