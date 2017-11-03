import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FullDayEvent from './FullDayEventContainer';
import { FullDayEventContainerProps } from './FullDayEventContainer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FullDayEventContainerProps = {
    data: [],
    days: 2,
    timestamp: 123,
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
    isSelectedItem: () => {return true},
    itemSelected: () => null,
    itemUnSelected: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><FullDayEvent {...props}/></MuiThemeProvider>, div);
});
