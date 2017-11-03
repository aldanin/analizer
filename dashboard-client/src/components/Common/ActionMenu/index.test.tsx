import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ActionMenu from './';
import { ActionMenuProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ActionMenuProps = {
    iconStyle: {
      fontSize: '17px',
    },
    addTagCallback: () => null,
    addToNotebookCallback: () => null,
    markAsReadCallback: () => null,
    markAsUnreadCallback: () => null,
    translateCallback: () => null,
    transcriptCallback: () => null,
    exportCallback: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><ActionMenu {...props}/></MuiThemeProvider>, div);
});
