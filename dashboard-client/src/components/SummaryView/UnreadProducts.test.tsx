import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UnreadProducts from './UnreadProducts';
import { UnreadProductsProps } from './UnreadProducts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: UnreadProductsProps = {
    data: {
        userApps: {
          calls: 9,
          im: 97,
          mail: 14,
          contacts: 0,
          socialNetwork: 7,
          browser: 8,
          gallery: 119,
          calendar: 0,
        },
        sensors: {
          activity: 107,
          snapshots: 233,
          envAudio: 52,
          locations: 48,
        },
        deviceSystem: {
          directory: 8,
          systemInfo: 12,
          accounts: 1,
        }
      }
  }

  ReactDOM.render(<UnreadProducts {...props}/>, div);
});
