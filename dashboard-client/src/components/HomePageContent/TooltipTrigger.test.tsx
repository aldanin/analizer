import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TooltipTrigger from './TooltipTrigger';
import { TooltipTriggerProps } from './TooltipTrigger';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TooltipTriggerProps = {
    onShow: () => null,
    onHide: () => null,

  }

  ReactDOM.render(<TooltipTrigger {...props}/>, div);
});
