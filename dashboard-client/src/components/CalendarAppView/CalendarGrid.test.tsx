import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CalendarGrid from './CalendarGrid';
import { CalendarGridProps } from './CalendarGrid';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CalendarGridProps = {
    data: [],
    timestamp: 12345,
    gridSetStar: () => null,
    gridRemoveTag: () => null,
    showAllEventsOnAgendaTab: () => null,
    actionMenuCallbacks : {
      addTag: () => null,
      addToNotebook: () => null,
      markAsRead: () => null,
      markAsUnread: () => null,
      askForTranslate: () => null,
      askForTranscript: () => null,
      exportItem: () => null,
    },
    isSelectedItem: () => {return true},
    itemSelected: () => null,
    itemUnSelected: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
         <CalendarGrid {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
