import * as React from 'react';
import * as ReactDOM from 'react-dom';

import DeviceSystem from './DeviceSystem';
import { DeviceSystemProps } from './DeviceSystem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DeviceSystemProps = {
    data: {
      directory: 8,
      systemInfo: 12,
      accounts: 1,
    },
    params: {
      agent_id: '1',
    }
  }

  ReactDOM.render(<DeviceSystem {...props}/>, div);
});
