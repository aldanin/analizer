import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Mail from './Mail';
import { MailProps } from './Mail';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MailProps = {
    data: {
      id: '0',
      from: 'Roy Van Bjorn',
      to: ['First Person', 'Second Person'],
      cc: [],
      subject: 'FWD: Requested documents',
      shortContent: 'Please send Ad..',
      timestamp: 11111111,
      attachments: [],
      body: '<div style="text-align: center"><h2 style="color: red">Title</h2><h3>Message body</h3></div>',
      isFavorite: true,
      hasNotes: true,
      hasTranslation: false,
      hasTranscript: false,
      isRead: false,
      tags: [],
    },
    onMailClick: () => null,
    setStar: () => null,
    removeTag: () => null,
    mailAddTag: () => null,
    markAsRead: () => null,
    markAsUnread: () => null,
    itemSelected: () => null,
    itemUnSelected: () => null,
    isItemSelected: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><Mail {...props}/></MuiThemeProvider>, div);
});
