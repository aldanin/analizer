import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinConnection from './LinkedinConnection';
import { LinkedinConnectionProps } from './LinkedinConnection';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
injectTapEventPlugin();

const ActionMenuTest = {
  addTagCallback: () => null,
  addToNotebookCallback: () => null,
  markAsReadCallback: () => null,
  markAsUnreadCallback: () => null,
  translateCallback: () => null,
  transcriptCallback: () => null,
  exportCallback: () => null,
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LinkedinConnectionProps = {
    linkedinConnectionActionMenu: ActionMenuTest,
    data: {
      id: 0,
      user: {
        id: 8,
        avatar: 'http://i1070.photobucket.com/albums/u497/crystalbay00/TwitterProfileSquare_sm_zpsn2kflx2e.jpg',
        name: 'Peter P',
      },
      headline: 'Programmer',
      position: 'Microsoft NYC',
      isFavorite: false,
      hasNotes: false,
      isRead: false,
      hasTranslation: false,
      tags: [],
    },
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <LinkedinConnection {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
