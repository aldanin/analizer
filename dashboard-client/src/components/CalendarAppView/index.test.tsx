import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CalendarAppView from './';
import { CalendarAppViewProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CalendarAppViewProps = {
    data: [],
    isNavigateBetweenAccounts: true,
    isNextAccountsEnable : true,
    isPreviousAccountsEnable: true,
    isFetching: false,
    startingDate: 1234567,
    startingAccountIndex: 0,
    requestUpdate: () => null,
    changeDate: () => null,
    extractNow: () => null,
    lastExtractionTime: 1234,
    updateTimeIndicator: 1234,
    showFilter: () => null,
    tagsFilter: () => null,
    actionsFilter: () => null,
    accountFilter: () => null,
    agendaSetStar: () => null,
    agendaRemoveTag: () => null,
    keyword: '',
    gridSetStar: () => null,
    gridRemoveTag: () => null,
    switchAccounts: () => null,
    actionMenuCallbacks : {
      addTag: () => null,
      addToNotebook: () => null,
      markAsRead: () => null,
      markAsUnread: () => null,
      askForTranslate: () => null,
      askForTranscript: () => null,
      exportItem: () => null,
    }
  }

  ReactDOM.render(<MuiThemeProvider><CalendarAppView {...props}/></MuiThemeProvider>, div);
});
