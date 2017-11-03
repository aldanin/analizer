import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LatestImmediateCommands from './LatestImmediateCommands';
import { LatestImmediateCommandsProps } from './LatestImmediateCommands';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LatestImmediateCommandsProps = {
    data: [],
  }

  ReactDOM.render(<LatestImmediateCommands {...props}/>, div);
});
