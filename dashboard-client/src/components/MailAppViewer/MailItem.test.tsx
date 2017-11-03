import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MailItem from './MailItem';
import { ListItemProps } from './MailItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ListItemProps = {
    content: <div>Test</div>,
    timestamp: 0,
  }

  ReactDOM.render(<MailItem {...props}/>, div);
});
