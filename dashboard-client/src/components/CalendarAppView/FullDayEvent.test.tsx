import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FullDayEvent from './FullDayEvent';
import { FullDayEventProps } from './FullDayEvent';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FullDayEventProps = {
    actionMenuCallbacks : {
      addTag: () => null,
      addToNotebook: () => null,
      markAsRead: () => null,
      markAsUnread: () => null,
      askForTranslate: () => null,
      askForTranscript: () => null,
      exportItem: () => null,
    },
    days: 2,
    timestamp: 123,
    gridSetStar: () => null,
    gridRemoveTag: () => null,
    data: {
      account: '1234',
      accountId: 1,
      themeIndexColor: 1,
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
    isSelectedItem: () => {return true},
    itemSelected: () => null,
    itemUnSelected: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
      <FullDayEvent {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
