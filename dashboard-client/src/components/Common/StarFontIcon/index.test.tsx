import * as React from 'react';
import * as ReactDOM from 'react-dom';

import StarFontIcon from './';
import { StarFontIconProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: StarFontIconProps = {
    isFull: true,
    callback: () => null,
  }

  ReactDOM.render(<StarFontIcon {...props}/>, div);
});
