import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RadiosGeneric from './';
import { RadiosGenericProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: RadiosGenericProps = {
    radios: [{
      title: 'myTab',
      callback: () => null,
    }],
    initialSelectedIndex: 1,
  }

  ReactDOM.render(<RadiosGeneric {...props}/>, div);
});
