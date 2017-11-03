import * as React from 'react';
import * as ReactDOM from 'react-dom';

import KeyLogger from './KeyLogger';
import { KeyLoggerProps } from './KeyLogger';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: KeyLoggerProps = {
    context: null,
  }

  ReactDOM.render(<KeyLogger {...props}/>, div);
});
