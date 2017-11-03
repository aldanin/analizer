import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TwitterMention from './TwitterMention';
import { TwitterMentionProps } from './TwitterMention';

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
  const props: TwitterMentionProps = {
    tweeterMentionActionMenu: ActionMenuTest,
    message: {
      id: 0,
      user: {
        id: 3,
        avatar: 'http://www.biophysics.cornell.edu/images/paszek.jpg',
        name: 'Andy',
        nickname: 'anndy',
      },
      postDate: 1455220260000,
      contentBefore: `what do you think?`,
      contentAfter: ``,
      comments: 2,
      likes: 18,
      shares: 2,
      isFavorite: false,
      hasNotes: false,
      isRead: true,
      hasTranslation: false,
      tags: []
    },
    nickname: 'tester',
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <TwitterMention {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
