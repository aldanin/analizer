import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinProfile from './LinkedinProfile';
import { LinkedinProfileProps } from './LinkedinProfile';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LinkedinProfileProps = {
    data: {
      id: 0,
      user: {
        id: 0,
        avatar: 'http://orig08.deviantart.net/c591/f/2012/153/4/a/profile_picture_by_anonymous_noir-d51z873.png',
        name: 'Anonymous',
      },
      headline: 'Expert Hacker',
      currentPosition: 'ground-base',
      profile: {
        experience: [],
        education: [],
        skills: [],
      },
      connection: [],
      search: [],
    }
  }

  ReactDOM.render(<MuiThemeProvider><LinkedinProfile {...props}/></MuiThemeProvider>, div);
});
