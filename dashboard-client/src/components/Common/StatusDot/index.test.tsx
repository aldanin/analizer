import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StatusDot from './';
import { StatusDotProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: StatusDotProps = {
    color: 'rebeccapurple',
    style: {
      backgroundColor: 'yellow'
    }
  }

  ReactDOM.render(<StatusDot {...props}/>, div);
});
