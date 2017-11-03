import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UserApps from './UserApps';
import { UserAppsProps } from './UserApps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: UserAppsProps = {
    data: {
      calls: 9,
      im: 97,
      mail: 14,
      contacts: 0,
      socialNetwork: 7,
      browser: 8,
      gallery: 119,
      calendar: 0,
    },
    params: {
      agent_id: '1',
    }
  }

  ReactDOM.render(<UserApps {...props}/>, div);
});
