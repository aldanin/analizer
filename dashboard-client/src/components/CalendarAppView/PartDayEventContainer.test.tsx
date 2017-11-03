import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PartDayEventContainer from './PartDayEventContainer';
import { PartDayEventContainerProps } from './PartDayEventContainer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { defaultTheme } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PartDayEventContainerProps = {
    data: [],
    hours: 3.5,
    tooltipPosition: 'left',
    gridSetStar: () => null,
    gridRemoveTag: () => null,
    showAllEventsOnAgendaTab: () => null,
    fromTime: 0,
    toTime: 10,
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
      <PartDayEventContainer {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
