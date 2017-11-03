import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PartDayEvent from './PartDayEvent';
import { PartDayEventProps } from './PartDayEvent';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PartDayEventProps = {
    hours: 2.5,
    idx: 0,
    width: 50,
    fromTime: 0,
    toTime: 10,
    gridSetStar: () => null,
    gridRemoveTag: () => null,
    tooltipPosition: 'right',
    top: 0,
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
        <PartDayEvent {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
