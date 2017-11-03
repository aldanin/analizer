import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Post from './Post';
import { PostProps } from './Post';
import { ThemeProvider } from 'styled-components';
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PostProps = {
    user: {
      id: 0,
      name: 'Joe Brown',
      avatar: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2002,w' +
      '_2000,x_0,y_623/c_limit,dpr_1.0,f_auto,fl_lossy,q_80,w_200/michael_foster_fullres_02_niz0cb.jpg',
    },
    post: {
      id: 0,
      user: {
        id: 0,
        name: 'Joe Brown',
        avatar: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2002,w' +
        '_2000,x_0,y_623/c_limit,dpr_1.0,f_auto,fl_lossy,q_80,w_200/michael_foster_fullres_02_niz0cb.jpg',
      },
      timestamp: 0,
      mentions: [],
      tags: [],
      content: 'Very interesting chat connecting the wife: this is the first time we have seen him talk about' +
      '\'roses\' (=bombs) with a civilian. We should keep an eye out of more. Everyone please disseminate' +
      'as you see fit. Let\'s not let this go to waste.',
      comments: [],
    }
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme.defaultTheme}>
      <Post {...props}/>
    </ThemeProvider>,
    div);
});
