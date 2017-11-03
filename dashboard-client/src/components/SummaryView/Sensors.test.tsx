import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Sensors from './Sensors';
import { SensorsProps } from './Sensors';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SensorsProps = {
    data: {
      activity: 107,
      snapshots: 233,
      envAudio: 52,
      locations: 48,
    },
    params: {
      agent_id: '1',
    }
  }

  ReactDOM.render(<Sensors {...props}/>, div);
});
