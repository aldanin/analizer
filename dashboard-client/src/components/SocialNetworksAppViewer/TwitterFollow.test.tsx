import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TwitterFollow from './TwitterFollow';
import { TwitterFollowProps } from './TwitterFollow';

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
  const props: TwitterFollowProps = {
    tweeterFollowActionMenu: ActionMenuTest,
    follow: {
      id: 0,
      user: {
        id: 3,
        avatar: 'http://www.biophysics.cornell.edu/images/paszek.jpg',
        name: 'Andy',
        nickname: 'anndy',
      },
      status: 'Live and let live :)',
      isFavorite: false,
      hasNotes: false,
      isRead: true,
      hasTranslation: false,
      tags: [],
    },
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <TwitterFollow {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
