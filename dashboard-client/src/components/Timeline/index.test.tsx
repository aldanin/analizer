import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Timeline from './';
import { TimelineProps } from './';

import Themed from '../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TimelineProps = {
  }

  ReactDOM.render(<Themed><Timeline {...props}/></Themed>, div);
});
