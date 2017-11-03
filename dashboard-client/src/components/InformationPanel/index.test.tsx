import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InformationPanel from './';
import { InformationPanelProps } from './';

import Themed from '../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: InformationPanelProps = {
  }

  ReactDOM.render(<Themed><InformationPanel {...props}/></Themed>, div);
});
