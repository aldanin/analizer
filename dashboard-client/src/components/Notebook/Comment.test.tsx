import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Comment from './Comment';
import { CommentProps } from './Comment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CommentProps = {
    comment: {
      id: 0,
      user: {
        id: 1,
        name: 'Dona Roberts',
        avatar: 'http://www.stylechum.com/wp-content/uploads/2015/07/platinum-blonde-300x300.jpg',
      },
      timestamp:  0,
      content: 'Good catch! I think these guys are baddies',
      tags: [],
    }
  }

  ReactDOM.render(<Comment {...props}/>, div);
});
