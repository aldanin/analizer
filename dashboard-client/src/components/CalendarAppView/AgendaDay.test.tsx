import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AgendaDay from './AgendaDay';
import { AgendaDayProps } from './AgendaDay';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { defaultTheme } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgendaDayProps = {
    data: [{
      agenda: {
        id: 0,
        title: 'Lunch with Team',
        location: {
          place: 'Meet&Wine',
          city: 'Chicago',
          street: 'Michigan Ave',
          number:  12,
        },
        description: 'Discussing all problematic issues',
        organizer: 'davidl@gmail.com',
        creationDate: 1494828201000,
        participants: ['jonesB@gmail.com', 'teamg@gmail.com', 'lee@yahoo.com'],
        attachments: [{
          id: 0,
          name: 'Brief',
          type: 'pdf',
        }],
        lastAppear: 1494828296000,
        fromTime: 1495099800000,
        toTime: 1495107000000,
        isNotebook: false,
        isFavorite: false,
        isFullDay: false,
        isNew: true,
        tags: [],
      },
      themeColorIndex: 0,
      accountId: 1,
      account: 'Robot',
      index: 0,
    }],
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
        <AgendaDay {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
