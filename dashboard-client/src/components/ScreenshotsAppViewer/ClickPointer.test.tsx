import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ClickPointer from './ClickPointer';
import { ClickPointerProps } from './ClickPointer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ClickPointerProps = {
    top: '0',
    left: '0',
    text: 'f',
  }

  ReactDOM.render(<ClickPointer {...props}/>, div);
});
