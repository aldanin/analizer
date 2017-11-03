import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TwitterMessage from './TwitterMessage';
import { TwitterMessageProps } from './TwitterMessage';

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
  const props: TwitterMessageProps = {
    tweeterMessageActionMenu: ActionMenuTest,
    message: {
      id: 1,
      user: {
        id: 1,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsov' +
        'bKWXYPahTQd_ZssMuC2Bc7ZbPJzXumMFcbQzBA2IbN_Mr',
        name: 'Silvey',
        nickname: 'silvsilv',
      },
      postDate: 1455261660000,
      content: `Agree`,
      comments: [],
      likes: 2,
      shares: 0,
      isFavorite: false,
      hasNotes: false,
      hasTranslation: false,
      isRead: false,
      tags: []
    },
    isComment: false,
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <TwitterMessage {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
