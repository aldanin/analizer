import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AgendaList from './AgendaList';
import { AgendaListProps } from './AgendaList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { defaultTheme } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgendaListProps = {
    data: [],
    fromTime: 0,
    toTime: 1,
    agendaSetStar: () => null,
    agendaRemoveTag: () => null,
    actionMenuCallbacks : {
      addTag: () => null,
      addToNotebook: () => null,
      markAsRead: () => null,
      markAsUnread: () => null,
      askForTranslate: () => null,
      askForTranscript: () => null,
      exportItem: () => null,
    },
    agendaItemSelected: () => null,
    agendaItemUnSelected: () => null,
    isSelectedItem: () => {return true},
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
      <AgendaList {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
