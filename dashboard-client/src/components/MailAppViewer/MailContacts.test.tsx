import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MailContacts from './MailContacts';
import { MailContactsProps } from './MailContacts';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MailContactsProps = {
    data: [{
      id: '1',
      email: 'BenJ@gmail.com',
      avatar: 'http://1.media.collegehumor.cvcdn.com/14/45/7d51a082762115b56229fc6b741c1438.jpg',
      labels: [{
        id: '0',
        label: 'Inbox',
        newItems: 5,
      }],
      inbox: [{
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
      }, {
        id: '1',
        from: 'Mark Johnson',
        to: ['First Person', 'Second Person', 'Third Person'],
        cc: [],
        subject: 'RE: Last week',
        shortContent: 'The meeting was very successful!',
        timestamp: 11111111,
        attachments: [],
        body: '<div>Body</div>',
        isFavorite: false,
        hasNotes: false,
        hasTranslation: false,
        hasTranscript: false,
        isRead: true,
        tags: ['Home'],
      }]
    }, {
      id: '2',
      email: 'BenJones@gmail.com',
      avatar: 'https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png',
      labels: [{
        id: '0',
        label: 'Inbox',
        newItems: 0,
      }],
      inbox: [{
        id: '2',
        from: 'Liz Stevens',
        to: ['First Person', 'Second Person'],
        cc: [],
        subject: 'Re: Hi :)',
        shortContent: 'Yes, I agree. Tell him to call me anytime',
        timestamp: 11111111,
        attachments: [],
        body: '<div>Body</div>',
        isFavorite: true,
        hasNotes: false,
        hasTranslation: false,
        hasTranscript: false,
        isRead: true,
        tags: [],
      }, {
        id: '3',
        from: 'Mark Johnson',
        to: ['First Person', 'Second Person', 'Third Person'],
        cc: [],
        subject: 'RE: Last week',
        shortContent: 'The meeting was very successful!',
        timestamp: 11111111,
        attachments: [],
        body: '<div>Body</div>',
        isFavorite: false,
        hasNotes: true,
        hasTranslation: false,
        hasTranscript: false,
        isRead: true,
        tags: [],
      }]
    }],
    accountIndex: 0,
    mailIndex: 1,
    onLabelClick: () => null,
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

  ReactDOM.render(<MuiThemeProvider><MailContacts {...props}/></MuiThemeProvider>, div);
});
