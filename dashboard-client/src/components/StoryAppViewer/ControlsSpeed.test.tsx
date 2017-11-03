import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ControlsSpeed from './ControlsSpeed';
import { ControlsSpeedProps } from './ControlsSpeed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ControlsSpeedProps = {
    speed: 1,
    onClick: (speed) => null,
  }

  ReactDOM.render(<ControlsSpeed {...props}/>, div);
});
