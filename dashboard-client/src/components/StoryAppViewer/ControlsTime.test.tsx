import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ControlsTime from './ControlsTime';
import { ControlsTimeProps } from './ControlsTime';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ControlsTimeProps = {
    onNextClick: () => null,
    onPrevClick: () => null,
    currentTime: 0,
  }

  ReactDOM.render(<ControlsTime {...props}/>, div);
});
