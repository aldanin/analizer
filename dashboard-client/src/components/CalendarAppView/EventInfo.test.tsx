import * as React from 'react';
import * as ReactDOM from 'react-dom';

import EventInfo from './EventInfo';
import { EventInfoProps } from './EventInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: EventInfoProps = {
    data: {
      account: '1234',
      accountId: 1,
      themeIndexColor: 0,
      event: {
        id: 1,
        title: 'Vacation',
        location: {
          place: '',
          city: '',
          street: '',
          number:  0,
        },
        description: 'My vacation',
        organizer: 'chucki@gmail.com',
        creationDate: 1494828940000,
        participants: [],
        attachments: [],
        lastAppear: 1494828970000,
        fromTime: 1495179600000,
        toTime: 1495380400000,
        isNotebook: false,
        isFavorite: false,
        isFullDay: true,
        isNew: false,
        tags: [],
      }
    },
    gridSetStar: () => null,
    gridRemoveTag: () => null,
    actionMenuCallbacks : {
      addTag: () => null,
      addToNotebook: () => null,
      markAsRead: () => null,
      markAsUnread: () => null,
      askForTranslate: () => null,
      askForTranscript: () => null,
      exportItem: () => null,
    },
    closeCallback: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <EventInfo {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
