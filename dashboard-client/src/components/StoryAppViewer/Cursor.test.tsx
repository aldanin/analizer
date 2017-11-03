import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Cursor from './Cursor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
  }

  ReactDOM.render(<Cursor {...props}/>, div);
});
