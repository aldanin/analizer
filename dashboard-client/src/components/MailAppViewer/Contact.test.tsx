import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Contact from './Contact';
import { ContactProps } from './Contact';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContactProps = {
    id: '1',
    account: 'Robot',
    avatar: 'AvatarLink',
    folders: [],
    inbox: [],
    isShowing: true,
    onLabelClick: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><Contact {...props}/></MuiThemeProvider>, div);
});
