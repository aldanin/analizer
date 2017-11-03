import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LocationAppViewer from './';
import { LocationAppViewerProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LocationAppViewerProps = {
    requestUpdate: () => null,
    extractNow: () => null,
    isFetching: false,
    isFirstRequest: false,
    timerIndicator: 1,
    updateTimeIndicator: 40000,
    data: [],
    removeTag: () => null,
    setStar: () => null,
    addTag: () => null,
    markAsRead: () => null,
    markAsUnread: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><LocationAppViewer {...props}/></MuiThemeProvider>, div);
});
