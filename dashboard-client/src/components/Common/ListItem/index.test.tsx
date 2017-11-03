import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ListItem from './';
import { ListItemProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ListItemProps = {
    isNewItem: true,
    content: <div/>
  }

  ReactDOM.render(<ListItem {...props}/>, div);
});
