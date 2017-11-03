import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from '../Theme'

import PrevPassword from './PrevPassword';
import { PrevPasswordProps } from './PrevPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PrevPasswordProps = {
    key: 0,
    password: {
      value: 'pw',
      lastUsed: 0
    },
    theme: Theme.defaultTheme
  }

  ReactDOM.render(<PrevPassword {...props}/>, div);
});
