import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Default from './Default';
import { DefaultProps } from './Default';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DefaultProps = {
  }

  ReactDOM.render(<Default {...props}/>, div);
});
