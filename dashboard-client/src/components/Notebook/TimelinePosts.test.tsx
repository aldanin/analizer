import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TimeLinePosts from './TimelinePosts';
import { TimeLinePostsProps } from './TimelinePosts';
import { ThemeProvider } from 'styled-components';
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TimeLinePostsProps = {
    timestamp: 0,
    posts: [],
    user: {
      id: 0,
      name: 'Joe Brown',
      avatar: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2002,w' +
      '_2000,x_0,y_623/c_limit,dpr_1.0,f_auto,fl_lossy,q_80,w_200/michael_foster_fullres_02_niz0cb.jpg',
    }
  }

  ReactDOM.render(<ThemeProvider theme={Theme.defaultTheme}><TimeLinePosts {...props}/></ThemeProvider>, div);
});
