import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Content from './Content';
import { ContentProps } from './Content';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContentProps = {
    mails: [],
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

  ReactDOM.render(<Content {...props}/>, div);
});
